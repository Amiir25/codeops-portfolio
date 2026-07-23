'''
1. Book class.

Define Book with title, author, and pages. Add a describe() method that prints a
one-line summary. Create two books.
'''

class Book:
    """A simple class to model a book"""

    def __init__(self, title, author, pages):
        """Initiaize class attributes"""
        self.title = title
        self.author = author
        self.pages = pages
    
    def describe(self):
        """A method to describe one-line summery of the book"""
        print(f"{self.title} is written by {self.author} with {self.pages} pages.")

        
book1 = Book("Python Crush Course", "Eric Matthes", 514)
book2 = Book("Python Programming", "John Zelle", 536)

book1.describe()
book2.describe()
    


'''
2. Product class.
Define Product with name, price (ETB), and quantity. Add restock(n) and
sell(n) methods that change the quantity.

3. Make it private.
Change quantity to a private __quantity and add a @property getter for it.

4. Validate.
Add a setter (or guard in sell) that refuses to let the quantity go below zero.

5. Prove independence.
Create three Product objects, change one, and show the other two are
unaffected.
'''

class Product:
    """A simple class to model product"""

    def __init__(self, name, price, qty):
        self.name = name
        self.price = price
        self.__qty = qty
    
    @property
    def qty(self):
        """Getter method for quantity attribute"""
        return self.__qty
    
    def restock(self, n):
        """A method to increase the qty"""
        if n <= 0:
            print("Invalid amount to restock a product")
            return
        
        self.__qty += n
        # print(f"{self.name} current quantity: {self.__qty}")
    
    def sell(self, n):
        """A method to dicrease the qty of a product on sell"""
        if n > self.__qty:
            print("Insufficient amount")
            return
        
        self.__qty -= n
        # print(f"{self.name} current quantity: {self.__qty}")

product1 = Product("Eye Glasses", 420, 18)
product2 = Product("Bag", 800, 10)
product3 = Product("Shirt", 200, 32)

print(product1.qty)
product1.restock(5)
product1.sell(12)
print(product1.qty)

print("***********")
print(product2.qty)
print(product3.qty)