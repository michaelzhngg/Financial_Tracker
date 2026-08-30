using Backend.Application.DTOs;
using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Application.Common;

public static class Mapping
{
    public static UserDto ToDto(this User user) =>
        new(user.Id, user.Email, user.DisplayName, user.BaseCurrency);

    public static AccountDto ToDto(this Account account) =>
        new(account.Id,
            account.Name,
            account.Type,
            account.Type.ToString(),
            account.Currency.Code,
            decimal.Round(account.Balance, 2, MidpointRounding.AwayFromZero),
            account.IsActive,
            account.CreatedAt);

    public static CategoryDto ToDto(this Category category) =>
        new(category.Id,
            category.Name,
            category.Type,
            category.Type.ToString(),
            category.Color,
            category.Icon,
            category.IsActive);

    public static TransactionDto ToDto(this Transaction transaction) =>
        new(transaction.Id,
            transaction.Type,
            transaction.Type.ToString(),
            transaction.AccountId,
            transaction.Account?.Name ?? string.Empty,
            transaction.Account?.Currency.Code ?? string.Empty,
            transaction.ToAccountId,
            transaction.ToAccount?.Name,
            transaction.CategoryId,
            transaction.Category?.Name,
            transaction.Category?.Color,
            transaction.Amount,
            transaction.SignedAmountForSourceAccount,
            transaction.Description,
            transaction.TransactionDate,
            transaction.CreatedAt,
            transaction.Receipt?.ToDto());

    public static ReceiptDto ToDto(this Receipt receipt) =>
        new(receipt.Id,
            receipt.Merchant,
            receipt.Notes,
            receipt.Subtotal,
            receipt.ChargesTotal,
            receipt.Total,
            receipt.Items.OrderBy(i => i.SortOrder).Select(i => i.ToDto(receipt)).ToList(),
            receipt.Charges.OrderBy(c => c.SortOrder).Select(c => c.ToDto(receipt)).ToList());

    public static ReceiptItemDto ToDto(this ReceiptItem item, Receipt receipt) =>
        new(item.Id,
            item.Name,
            item.Quantity,
            item.UnitPrice,
            item.LineTotal,
            item.SortOrder);

    public static ReceiptChargeDto ToDto(this ReceiptCharge charge, Receipt receipt) =>
        new(charge.Id,
            charge.Label,
            charge.Type,
            charge.Type.ToString(),
            charge.Value,
            charge.ResolveAmount(receipt.Subtotal),
            charge.SortOrder);

    public static string ToMonthLabel(int year, int month) =>
        new DateTime(year, month, 1).ToString("MMMM yyyy", System.Globalization.CultureInfo.InvariantCulture);

    /// <summary>
    /// Inclusive start and exclusive end of the period containing <paramref name="reference"/>.
    /// </summary>
    public static (DateTimeOffset Start, DateTimeOffset End) GetPeriodRange(BudgetPeriod period, DateTimeOffset reference)
    {
        var local = reference.ToLocalTime();

        switch (period)
        {
            case BudgetPeriod.Weekly:
            {
                var daysFromMonday = ((int)local.DayOfWeek + 6) % 7;
                var start = new DateTimeOffset(local.Date.AddDays(-daysFromMonday), local.Offset);
                return (start, start.AddDays(7));
            }

            case BudgetPeriod.Yearly:
            {
                var start = new DateTimeOffset(new DateTime(local.Year, 1, 1), local.Offset);
                return (start, start.AddYears(1));
            }

            case BudgetPeriod.Monthly:
            default:
            {
                var start = new DateTimeOffset(new DateTime(local.Year, local.Month, 1), local.Offset);
                return (start, start.AddMonths(1));
            }
        }
    }
}
