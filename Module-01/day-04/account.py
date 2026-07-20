'''
The first version of Addis Bank — Account Management System: an Account class with an
owner, an account number, and a private balance that can only change through validated deposit
and withdraw methods.

Requirements
• Define Account with public owner and account_number, and a private __balance (default 0).
• Expose the balance through a read-only @property — no direct edits from outside.
• Write deposit(amount) and withdraw(amount) that reject non-positive amounts and overdrafts.
• Add a statement() method that prints the owner, account number, and balance in ETB.
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
            print("Deposit amount can not be less than 1!")
            return
        self.__balance += amount
    
    def withdraw(self, amount):
        """Withdraw method to subtract from the balance"""
        if amount > self.__balance:
            print("Insufficient balance!")
            return
        self.__balance -= amount
    
    def statement(self):
        """Prints a statement about the account"""
        print(f"Owner: {self.owner}")
        print(f"Acc. Number: {self.account_number}")
        print(f"Balance: {self.__balance}")

acc1 = Account("Alex", 10002310)
print(acc1.balance)

print("**********")

acc1.deposit(12000)
print(acc1.balance)

print("**********")

acc1.withdraw(2500)
print(acc1.balance)
