namespace Backend.Domain.Common
{
    public abstract class AuditableEntity : Entity
    {
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        protected AuditableEntity()
        {
            var now = DateTimeOffset.UtcNow;

            CreatedAt = now;
            UpdatedAt = now;
        }

        protected void MarkAsUpdated()
        {
            UpdatedAt = DateTimeOffset.UtcNow;
        }
    }
}
