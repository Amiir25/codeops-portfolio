'''
Copy your day04/account.py into day05/, then build on it — don't restart.

Two new account types that inherit from Account: a SavingsAccount that earns interest, and a
CurrentAccount that allows an overdraft — then drive them all through one polymorphic loop.

Requirements
• SavingsAccount extends Account with a rate and an add_interest() method that reuses
deposit().
• CurrentAccount extends Account with an overdraft limit and an overridden withdraw() that
allows balances down to the overdraft.
• Override statement() in each subclass so it labels the account type.
• Use super().__init__() in both subclasses; don't duplicate the parent's setup.
'''

class Account:
    """A class to model account for account management system"""

    def __init__(self, owner, account_number, balance = 0):
        """Initialize the class attributes"""

        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
    
    @property
    def balance(self):
        """A getter method for balance attribute"""
        
        return self.__balance
    
    def deposit(self, amount):
        """Deposit method to add to the balance"""
        
        if amount <= 0:
            print("Deposit amount must be positive!")
            return False
        
        self.__balance += amount
        print(f"Diposited: {amount}. New balance: {self.__balance}")
        return True
    
    def withdraw(self, amount):
        """Withdraw method to subtract from the balance"""

        if amount <= 0:
            print("Withdrawal amount must be positive!")
            return False
        
        if amount > self.__balance:
            print("Insufficient balance!")
            return False
        
        self.__balance -= amount
        print(f"Withdrew: {amount}. New balance: {self.__balance}")
        return True

    def statement(self):
        """Prints a statement about the account"""
        
        print(f"Owner: {self.owner}")
        print(f"Acc.No: {self.account_number}")
        print(f"Balance: {self.__balance}")

# SavingsAccount class
class SavingsAccount(Account):
    """A sub class of Account to calculate intereset over time"""

    def __init__(self, owner, account_number, balance=0):
        """Initialize attributes of SavingsAccount"""

        super().__init__(owner, account_number, balance)
        self.rate = 0.15
    
    def add_interest(self):
        """Calculate and add interest to the balance"""

        interest = self.balance * self.rate
        self.deposit(interest)
    
    def statement(self):
        """Prints a staement about the account"""

        print("\n[SavingsAccount]")
        super().statement()

# CurrentAccount class
class CurrentAccount(Account):
    """A sub class of Account class specifies the overdraft_limit"""

    def __init__(self, owner, account_number, balance=0):
        """Initialize attributes of CurrentAccount"""

        super().__init__(owner, account_number, balance)
        self.overdraft_limit = 500
    
    def withdraw(self, amount):
        """Withdraw method"""

        if amount > 0 and (self.__balance - amount >= -self.overdraft_limit):
            self.__balance -= amount
            print(f"Withdrew: {amount}. New balance: {self.__balance}")
            return True
        
        print("Overdraft limit exeeded!")
        return False
    
    def statement(self):
        """Prints a staement about the account"""

        print("\n[CurrentAccount]")
        super().statement()
        

acc1 = Account("Abebe", 10001213)
acc1.statement()

acc2 = SavingsAccount("Kebede", 10002310, 1250)
acc2.statement()

acc3 = CurrentAccount("Almaz", 10003201, 450)
acc3.statement()