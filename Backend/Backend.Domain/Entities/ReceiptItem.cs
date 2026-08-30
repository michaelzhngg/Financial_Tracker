using Backend.Domain.Common;

namespace Backend.Domain.Entities;

public sealed class ReceiptItem : Entity
{
    public Guid ReceiptId { get; private set; }

    public string Name { get; private set; }

    public decimal Quantity { get; private set; }

    public decimal UnitPrice { get; private set; }

    public int SortOrder { get; private set; }

    public decimal LineTotal => decimal.Round(Quantity * UnitPrice, 2, MidpointRounding.AwayFromZero);

    private ReceiptItem()
    {
        Name = string.Empty;
    }

    private ReceiptItem(string name, decimal quantity, decimal unitPrice, int sortOrder)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Item name cannot be empty.", nameof(name));
        }

        if (quantity <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");
        }

        if (unitPrice < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(unitPrice), "Unit price cannot be negative.");
        }

        Name = name.Trim();
        Quantity = decimal.Round(quantity, 3, MidpointRounding.AwayFromZero);
        UnitPrice = decimal.Round(unitPrice, 2, MidpointRounding.AwayFromZero);
        SortOrder = sortOrder;
    }

    public static ReceiptItem Create(string name, decimal quantity, decimal unitPrice, int sortOrder)
    {
        return new ReceiptItem(name, quantity, unitPrice, sortOrder);
    }

    internal void SetReceiptId(Guid receiptId)
    {
        ReceiptId = receiptId;
    }
}

