'''
1. Spot the SRP violation.

Take a Report class that builds, saves, and emails a report. Split it
into three focused classes.
'''

class BuildReport:
    """Build and format the report"""
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def generate_report(self):
        return (f"{self.title.upper()}\n{self.content}")


class SaveReport:
    """Save the report to a file"""
    def save_report(self, report, filename):
        with open(filename, 'w') as f:
            f.write(report.generate_report())


class SendReport:
    """Send the report to the recipient"""
    def send_report(self, report, recipient):
        body = report.generate_report()
        print(f"Sending email to {recipient} with content {body}")


report = BuildReport("Python", "Python is awesome")
saved_report = SaveReport()
sent_report = SendReport()

sent_report.send_report(report, "Alex")


# ====================================================================== #

'''
2. Refactor to OCP.

Replace an if/elif that prints a shape's area by shape type with a small
class hierarchy and one method.
'''

class Circle:
    """Calculate the area of a circle"""
    def __init__(self, radius):
        self.radius = radius
        self.pi = 3.14
    
    def area(self):
        return self.pi * (self.radius ** 2)


class Rectangle:
    """Calculate the area of a rectangle"""
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width


class Triangle:
    """Calculate the area of a triangle"""
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 1/2 * self.base * self.height


shapes = [Circle(1.2), Rectangle(3, 3.4), Triangle(2, 4)]
for shape in shapes:
    print(shape.area())


# ====================================================================== #

'''
3. Write a Singleton.

Build an AppSettings Singleton holding a currency ("ETB") and confirm two
instances are the same object.
'''

class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance


app1 = AppSettings()
app2 = AppSettings()

print(app1 is app2)


# ====================================================================== #

'''
4. Write a Factory.

Create a ShapeFactory.create(kind) that returns a Circle, Square, or
Triangle.
'''

class Circle:
    def draw(self):
        return "Drawing a Circle"

class Square:
    def draw(self):
        return "Drawing a Square"

class Triangle:
    def draw(self):
        return "Drawing a Triangle"


class ShapeFactory:
    def create(kind):
        kind = kind.lower()
        
        if kind == "circle":
            return Circle()
        elif kind == "square":
            return Square()
        elif kind == "triangle":
            return Triangle()
        else:
            print(f"Warning: Unknown shape type '{kind}'")
            return None


my_circle = ShapeFactory.create("circle")
my_square = ShapeFactory.create("square")
my_triangle = ShapeFactory.create("triangle")

print(my_circle.draw())
print(my_square.draw())
print(my_triangle.draw())


# ====================================================================== #

'''
5. Write an Observer pair.

Make a NewsAgency subject and two subscriber classes that print when
notified.
'''

class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def attach(self, subscriber):
        """Add a subscriber to the list."""
        self.subscribers.append(subscriber)

    def notify(self, news_headline):
        """Loop through all subscribers and send them the update."""
        print(f"\nNews Agency breaking news: '{news_headline}'")

        for sub in self.subscribers:
            sub.update(news_headline)


class EmailSubscriber:
    def update(self, news_headline):
        print(f"Email sent to subscriber: New article uploaded -> {news_headline}")


class PushNotificationSubscriber:
    def update(self, news_headline):
        print(f"Phone notification popped up: Breaking news alert -> {news_headline}")


agency = NewsAgency()

email_user = EmailSubscriber()
phone_user = PushNotificationSubscriber()

agency.attach(email_user)
agency.attach(phone_user)

agency.notify("Python is officially declared the best programming language!")