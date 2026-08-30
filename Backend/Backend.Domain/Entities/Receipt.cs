using Backend.Domain.Common;

namespace Backend.Domain.Entities;

public sealed class Receipt : AuditableEntity
{
    public Guid TransactionId { get; private set; }

    public string Merchant { get; private set; }

    public string Notes { get; private set; }

    private readonly List<ReceiptItem> _items = new();
    public IReadOnlyCollection<ReceiptItem> Items => _items.AsReadOnly();

    private readonly List<ReceiptCharge> _charges = new();
    public IReadOnlyCollection<ReceiptCharge> Charges => _charges.AsReadOnly();

    public decimal Subtotal => decimal.Round(
        _items.Sum(item => item.LineTotal),
        2,
        MidpointRounding.AwayFromZero);

    public decimal ChargesTotal => decimal.Round(
        _charges.Sum(charge => charge.ResolveAmount(Subtotal)),
        2,
        MidpointRounding.AwayFromZero);

    public decimal Total => decimal.Round(Subtotal + ChargesTotal, 2, MidpointRounding.AwayFromZero);

    private Receipt()
    {
        Merchant = string.Empty;
        Notes = string.Empty;
    }

    private Receipt(
        Guid transactionId,
        string? merchant,
        string? notes,
        IEnumerable<ReceiptItem> items,
        IEnumerable<ReceiptCharge> charges)
    {
        if (transactionId == Guid.Empty)
        {
            throw new ArgumentException("Transaction ID cannot be empty.", nameof(transactionId));
        }

        var itemList = items.ToList();

        if (itemList.Count == 0)
        {
            throw new ArgumentException("Receipt must have at least one item.", nameof(items));
        }

        TransactionId = transactionId;
        Merchant = merchant?.Trim() ?? string.Empty;
        Notes = notes?.Trim() ?? string.Empty;

        foreach (var item in itemList)
        {
            item.SetReceiptId(Id);
            _items.Add(item);
        }

        foreach (var charge in charges)
        {
            charge.SetReceiptId(Id);
            _charges.Add(charge);
        }
    }

    public static Receipt Create(
        Guid transactionId,
        string? merchant,
        string? notes,
        IEnumerable<ReceiptItem> items,
        IEnumerable<ReceiptCharge> charges)
    {
        return new Receipt(transactionId, merchant, notes, items, charges);
    }

    public void Replace(
        string? merchant,
        string? notes,
        IEnumerable<ReceiptItem> items,
        IEnumerable<ReceiptCharge> charges)
    {
        var itemList = items.ToList();

        if (itemList.Count == 0)
        {
            throw new ArgumentException("Receipt must have at least one item.", nameof(items));
        }

        Merchant = merchant?.Trim() ?? string.Empty;
        Notes = notes?.Trim() ?? string.Empty;

        _items.Clear();
        foreach (var item in itemList)
        {
            item.SetReceiptId(Id);
            _items.Add(item);
        }

        _charges.Clear();
        foreach (var charge in charges)
        {
            charge.SetReceiptId(Id);
            _charges.Add(charge);
        }

        MarkAsUpdated();
    }
}
