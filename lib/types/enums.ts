// Mirrors backend enums (FTBackend.Core.Entities), which serialize as raw
// integers over the wire there is no JsonStringEnumConverter configured.

export const AccountType = {
  Checking: 0,
  Savings: 1,
  CreditCard: 2,
  Investment: 3,
  Cash: 4,
} as const;

export const accountTypeLabels: Record<number, string> = {
  [AccountType.Checking]: "Checking",
  [AccountType.Savings]: "Savings",
  [AccountType.CreditCard]: "Credit Card",
  [AccountType.Investment]: "Investment",
  [AccountType.Cash]: "Cash",
};

export const accountTypeOptions = Object.entries(accountTypeLabels).map(
  ([value, label]) => ({ value: Number(value), label })
);

export const TransactionType = {
  Income: 0,
  Expense: 1,
} as const;

export const transactionTypeLabels: Record<number, string> = {
  [TransactionType.Income]: "Income",
  [TransactionType.Expense]: "Expense",
};
