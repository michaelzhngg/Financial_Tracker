using Backend.Domain.Common;
using Backend.Domain.Enums;

namespace Backend.Domain.Entities;

public sealed class ReceiptCharge : Entity
{
    public Guid ReceiptId { get; private set; }

    public string Label { get; private set; }

    public ChargeType Type { get; private set; }

    public decimal Value { get; private set; }

    public int SortOrder { get; private set; }

    private ReceiptCharge()
    {
        Label = string.Empty;
    }

    private ReceiptCharge(string label, ChargeType type, decimal value, int sortOrder)
    {
        if (string.IsNullOrWhiteSpace(label))
        {
            throw new ArgumentException("Charge label cannot be empty.", nameof(label));
        }

        if (value < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(value), "Charge value cannot be negative.");
        }

        if (type == ChargeType.Percentage && value > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(value), "Percentage value cannot exceed 100.");
        }

        Label = label.Trim();
        Type = type;
        Value = decimal.Round(value, 2, MidpointRounding.AwayFromZero);
        SortOrder = sortOrder;
    }

    public static ReceiptCharge Create(string label, ChargeType type, decimal value, int sortOrder)
    {
        return new ReceiptCharge(label, type, value, sortOrder);
    }

    public decimal ResolveAmount(decimal subtotal)
    {
        return Type == ChargeType.Percentage
            ? decimal.Round(subtotal * Value / 100m, 2, MidpointRounding.AwayFromZero)
            : decimal.Round(Value, 2, MidpointRounding.AwayFromZero);
    }

    internal void SetReceiptId(Guid receiptId)
    {
        ReceiptId = receiptId;
    }
}
