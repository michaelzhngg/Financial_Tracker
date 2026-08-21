namespace Backend.Domain.ValueObjects
{

    public readonly record struct Currency
    {
        public string Code { get; }

        private Currency(string code)
        {
            Code = code;
        }

        public static Currency Create(string code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentException(
                    "Currency code cannot be empty.",
                    nameof(code));
            }

            var normalizedCode = code.Trim().ToUpperInvariant();

            if (normalizedCode.Length != 3)
            {
                throw new ArgumentException(
                    "Currency code must contain exactly 3 characters.",
                    nameof(code));
            }

            return new Currency(normalizedCode);
        }

        public override string ToString() => Code;
    }
}
