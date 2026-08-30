using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Backend.Infrastructure.Persistence;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Account> Accounts => Set<Account>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Transaction> Transactions => Set<Transaction>();

    public DbSet<Budget> Budgets => Set<Budget>();

    public DbSet<Receipt> Receipts => Set<Receipt>();

    public DbSet<ReceiptItem> ReceiptItems => Set<ReceiptItem>();

    public DbSet<ReceiptCharge> ReceiptCharges => Set<ReceiptCharge>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // SQLite has no native DateTimeOffset type, so store every timestamp as
        // UTC ticks. This keeps range comparisons translatable and correctly ordered.
        var converter = new ValueConverter<DateTimeOffset, long>(
            value => value.UtcTicks,
            value => new DateTimeOffset(value, TimeSpan.Zero));

        var nullableConverter = new ValueConverter<DateTimeOffset?, long?>(
            value => value == null ? null : value.Value.UtcTicks,
            value => value == null ? null : new DateTimeOffset(value.Value, TimeSpan.Zero));

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTimeOffset))
                {
                    property.SetValueConverter(converter);
                }
                else if (property.ClrType == typeof(DateTimeOffset?))
                {
                    property.SetValueConverter(nullableConverter);
                }
            }
        }

        base.OnModelCreating(modelBuilder);
    }
}

