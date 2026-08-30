using Backend.Domain.Entities;
using Backend.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Persistence.Configurations;

public sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(user => user.Id);

        builder.Property(user => user.Email).IsRequired().HasMaxLength(160);
        builder.Property(user => user.DisplayName).IsRequired().HasMaxLength(80);
        builder.Property(user => user.PasswordHash).IsRequired().HasMaxLength(256);
        builder.Property(user => user.BaseCurrency).IsRequired().HasMaxLength(3);

        builder.HasIndex(user => user.Email).IsUnique();
    }
}

public sealed class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ToTable("Accounts");
        builder.HasKey(account => account.Id);

        builder.Property(account => account.Name).IsRequired().HasMaxLength(80);
        builder.Property(account => account.Type).HasConversion<int>();

        // Money is stored with 2 decimal places of precision.
        builder.Property(account => account.Balance).HasColumnType("decimal(18,2)");

        builder.Property(account => account.Currency)
            .HasConversion(currency => currency.Code, code => Currency.Create(code))
            .IsRequired()
            .HasMaxLength(3);

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(account => account.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(account => new { account.UserId, account.Name }).IsUnique();
    }
}

public sealed class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");
        builder.HasKey(category => category.Id);

        builder.Property(category => category.Name).IsRequired().HasMaxLength(60);
        builder.Property(category => category.Type).HasConversion<int>();
        builder.Property(category => category.Color).IsRequired().HasMaxLength(16);
        builder.Property(category => category.Icon).IsRequired().HasMaxLength(40);

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(category => category.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(category => new { category.UserId, category.Name }).IsUnique();
    }
}

public sealed class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.ToTable("Transactions");
        builder.HasKey(transaction => transaction.Id);

        builder.Property(transaction => transaction.Type).HasConversion<int>();
        builder.Property(transaction => transaction.Amount).HasColumnType("decimal(18,2)");
        builder.Property(transaction => transaction.Description).IsRequired().HasMaxLength(240);

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(transaction => transaction.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(transaction => transaction.Account)
            .WithMany()
            .HasForeignKey(transaction => transaction.AccountId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(transaction => transaction.ToAccount)
            .WithMany()
            .HasForeignKey(transaction => transaction.ToAccountId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(transaction => transaction.Category)
            .WithMany()
            .HasForeignKey(transaction => transaction.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(transaction => new { transaction.UserId, transaction.TransactionDate });
        builder.HasIndex(transaction => new { transaction.UserId, transaction.CategoryId });
    }
}

public sealed class BudgetConfiguration : IEntityTypeConfiguration<Budget>
{
    public void Configure(EntityTypeBuilder<Budget> builder)
    {
        builder.ToTable("Budgets");
        builder.HasKey(budget => budget.Id);

        builder.Property(budget => budget.Amount).HasColumnType("decimal(18,2)");
        builder.Property(budget => budget.Period).HasConversion<int>();

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(budget => budget.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(budget => budget.Category)
            .WithMany()
            .HasForeignKey(budget => budget.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(budget => new { budget.UserId, budget.CategoryId }).IsUnique();
    }
}

public sealed class ReceiptConfiguration : IEntityTypeConfiguration<Receipt>
{
    public void Configure(EntityTypeBuilder<Receipt> builder)
    {
        builder.ToTable("Receipts");
        builder.HasKey(receipt => receipt.Id);

        builder.Property(receipt => receipt.Merchant).IsRequired().HasMaxLength(160);
        builder.Property(receipt => receipt.Notes).IsRequired().HasMaxLength(500);

        builder.HasOne<Transaction>()
            .WithOne(transaction => transaction.Receipt)
            .HasForeignKey<Receipt>(receipt => receipt.TransactionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(receipt => receipt.TransactionId).IsUnique();

        builder.HasMany(receipt => receipt.Items)
            .WithOne()
            .HasForeignKey(item => item.ReceiptId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(receipt => receipt.Charges)
            .WithOne()
            .HasForeignKey(charge => charge.ReceiptId)
            .OnDelete(DeleteBehavior.Cascade);

        var itemsNavigation = builder.Metadata.FindNavigation(nameof(Receipt.Items));
        itemsNavigation?.SetPropertyAccessMode(PropertyAccessMode.Field);

        var chargesNavigation = builder.Metadata.FindNavigation(nameof(Receipt.Charges));
        chargesNavigation?.SetPropertyAccessMode(PropertyAccessMode.Field);

        builder.Ignore(receipt => receipt.Subtotal);
        builder.Ignore(receipt => receipt.ChargesTotal);
        builder.Ignore(receipt => receipt.Total);
    }
}

public sealed class ReceiptItemConfiguration : IEntityTypeConfiguration<ReceiptItem>
{
    public void Configure(EntityTypeBuilder<ReceiptItem> builder)
    {
        builder.ToTable("ReceiptItems");
        builder.HasKey(item => item.Id);

        builder.Property(item => item.Name).IsRequired().HasMaxLength(160);
        builder.Property(item => item.Quantity).HasColumnType("decimal(18,3)");
        builder.Property(item => item.UnitPrice).HasColumnType("decimal(18,2)");

        builder.Ignore(item => item.LineTotal);
    }
}

public sealed class ReceiptChargeConfiguration : IEntityTypeConfiguration<ReceiptCharge>
{
    public void Configure(EntityTypeBuilder<ReceiptCharge> builder)
    {
        builder.ToTable("ReceiptCharges");
        builder.HasKey(charge => charge.Id);

        builder.Property(charge => charge.Label).IsRequired().HasMaxLength(80);
        builder.Property(charge => charge.Type).HasConversion<int>();
        builder.Property(charge => charge.Value).HasColumnType("decimal(18,2)");
    }
}


