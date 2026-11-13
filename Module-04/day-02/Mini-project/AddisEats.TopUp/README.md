# AddisEats.TopUp

A console application that processes five TeleBirr top-ups in a single run.
It prints one aligned line per customer and a grand total row.

## Features

- Collects five top-ups: customer name, network, and amount in ETB
- Validates every input and re-prompts instead of crashing
- Applies a network bonus with a `switch` expression:
  - Ethio Telecom: 5%
  - Safaricom: 3%
  - any other network: 0%
- Adds an extra 20 ETB to any top-up of 1,000 ETB or more
- Prints an aligned table with totals