import random
import math
import tkinter as tk
def string_to_matrix(s):
    n = int(len(s) ** 0.5)
    return [list(s[i:i+n]) for i in range(0, len(s), n)]
def print_matrix(matrix):
    for row in matrix:
        print(' '.join(map(str, row)))
def generateRandomString(character_list,character_amounts,seed):
    random_string = ''
    for i in range(len(character_list)):
        append = character_list[i] * character_amounts[i]
        random_string += append
    random.seed(seed)
    random_string = ''.join(random.sample(random_string,len(random_string)))
    return random_string

def reveal_value(row, col, value, tries):
    if tries[0] > 0:
        buttons[row][col].config(text=value, state=tk.DISABLED)
        buttons[row][col].config(bg='#FFFF00')
        counts[value] += 1
        tries[0] -= 1
        label.config(text=f'Amount of Tries: {tries[0]}'+ ''.join(f' {value}: {count}' for value, count in counts.items()))
        money.config(text='Money Calculation: '+ ' + '.join(f'({value} X {count})' for value, count in zip(currency_list,counts.values()))+' = ' + "${:,.2f}".format(sum(x * y for x, y in zip(currency_list,counts.values()))))
    if tries[0] == 0:
        reveal_grid()
def reveal_grid():
    for i in range(len(buttons)):
        for j in range(len(buttons[i])):
            buttons[i][j].config(text='{}'.format(a[i][j]))
            buttons[i][j].config(state=tk.DISABLED)
      
def validate_characters(characters):
    if len(set(characters)) != len(characters):
        raise ValueError("Characters must be unique")
    return characters

def validate_list(input_list, length, data_type, error_msg):
    input_data = input_list.split()
    for data in input_data:
        try:
            data_type(data)
        except ValueError:
            raise ValueError(error_msg[0])
    return_list = [data_type(data) for data in input_data]
    if len(return_list) != length:
        raise ValueError(error_msg[1])
    return return_list

def validate_currency(currency_list, length):
    return validate_list(currency_list, length, float, ["Currencies must be decimal points","There must be a valid decimal point number for each character"])

def validate_character_amounts(character_amounts, length):
    amounts = validate_list(character_amounts, length, int, ["Character amounts must be integers","There must be a character amount number for each character"])
    total = sum(amounts)
    if math.isqrt(total) ** 2 != total:
        raise ValueError("Total of all amounts must be a perfect square")
    return amounts

def validate_int(input_data, error_msg):
    try:
        int(input_data)
    except ValueError:
        raise ValueError(error_msg)
    return int(input_data)

def validate_seed(seed):
    return validate_int(seed, "Seed must be an integer")

def validate_tries(tries):
    return validate_int(tries, "Tries must be an integer")
def on_enter(event):
    if event.widget['state'] != 'disabled':
        event.widget.config(bg='green')

def on_leave(event):
    if event.widget['state'] != 'disabled':
        event.widget.config(bg='SystemButtonFace')
def submit(config,entries):
    try:
        config[0] = validate_characters(entries[0].get())
        config[1] = validate_currency(entries[1].get(),len(config[0]))
        config[2] = validate_character_amounts(entries[2].get(),len(config[0]))
        config[3] = validate_seed(entries[3].get())
        config[4] = [validate_tries(entries[4].get())]
        root.destroy()
    except ValueError as e:
        e1 = ["Characters must be unique"]
        e2 = ["Currencies must be decimal points","There must be a valid decimal point number for each character"]
        e3 = ["Character amounts must be integers","Total of all amounts must be a perfect square","There must be a character amount number for each character"]
        e4 = ["Seed must be an integer"]
        e5 = ["Tries must be an integer"]
        error_pack = [e1,e2,e3,e4,e5]
        for x in entries:
            x.config(highlightbackground=root.cget("background"), highlightcolor=root.cget("background"), highlightthickness=1)
        label_error.config(text=str(e))
        for y in range(len(entries)):
            if str(e) in error_pack[y]:
                entries[y].config(highlightbackground="red", highlightcolor="red", highlightthickness=1)
                break
if __name__ == "__main__":
    
    config = [None]*5
    root = tk.Tk()

    labels = ["Please enter the characters you want to add in the order you want to track them in like this 'WIN'",
              "Please enter the currency related to each character in the same order you type the character list, each separated by white space. and should look like this ' .5 .11 .01 ' ",
              "Please enter the amount of each character you wish to add to the scratch off each separated by white space. Total must be a square root and should look like this ' 1 11 388 ' ",
              "Please enter a number to generate a unique random version of scratch off",
              "Please enter a number of tries to allow the player to do"]
    entries = []
    for label_text in labels:
        label = tk.Label(root, text=label_text)
        entry = tk.Entry(root)
        label.pack()
        entry.pack()
        entries.append(entry)

    button_submit = tk.Button(root, text="Submit", command=lambda: submit(config, entries))
    button_exit = tk.Button(root, text="Exit", command=root.destroy)

    label_error = tk.Label(root, text="")

    button_submit.pack()
    button_exit.pack()

    label_error.pack()

    root.mainloop()
    print(config)
    # Unpack configuration variables
    character_list, currency_list, character_amounts, seed, tries = config

    # Generate random string and convert it to a matrix
    a = string_to_matrix(generateRandomString(character_list, character_amounts, seed))

    n = len(a)

    # Initialize Tkinter root window
    root = tk.Tk()
    root.withdraw()
    buttons = []

    # Initialize counts dictionary
    counts = {}
    for char in character_list:
        counts[char] = 0

    # Create grid of buttons
    for i in range(n):
        row = []
        for j in range(n):
            button = tk.Button(
                root,
                width=3,
                height=1,
                text=' ',
                command=lambda i=i, j=j: reveal_value(i, j, a[i][j], tries)
            )
            button.bind('<Enter>', on_enter)
            button.bind('<Leave>', on_leave)
            button.grid(row=i, column=j, padx=1)
            row.append(button)
        buttons.append(row)

    # Create labels and exit button
    label = tk.Label(
        root,
        text=f'Amount of Tries: {tries[0]}'
        + ''.join(f' {value}: {count}' for value, count in counts.items())
    )
    money = tk.Label(
        root,
        text='Money Calculation: '
        + ' + '.join(f'({value} X {count})' for value, count in zip(currency_list, counts.values()))
        + ' = '
        + "${:,.2f}".format(sum(x * y for x, y in zip(currency_list, counts.values())))
    )
    exit = tk.Button(root, text='Exit Game', command=lambda: root.destroy())

    # Place labels and exit button on grid
    label.grid(row=n + 1, columnspan=n)
    money.grid(row=n + 2, columnspan=n)
    exit.grid(row=n + 3, columnspan=n)

    # Show window
    root.deiconify()
    root.lift()
    root.mainloop()