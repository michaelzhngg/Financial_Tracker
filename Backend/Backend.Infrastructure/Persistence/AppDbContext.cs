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

        // PostgreSQL stores these as timestamptz. Normalize offsets to UTC before writing.
        var converter = new ValueConverter<DateTimeOffset, DateTime>(
            value => value.UtcDateTime,
            value => new DateTimeOffset(DateTime.SpecifyKind(value, DateTimeKind.Utc)));

        var nullableConverter = new ValueConverter<DateTimeOffset?, DateTime?>(
            value => value == null ? null : value.Value.UtcDateTime,
            value => value == null ? null : new DateTimeOffset(DateTime.SpecifyKind(value.Value, DateTimeKind.Utc)));

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

