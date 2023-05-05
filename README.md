# Obsidian Split Note at Cursor

This Plugin adds a functionality that is very important for me, being able to split a note into different notes in a quick and straight-forward fashion.

As this is my first ever Plugin for Obsidian and me being a total Typescript Noob, please check it in a testing vault first.

Don't make me responsible if all your files are emptied, deleted or your house burns down.

That said, on my Mac it works just fine, but I would be happy if some pro-user would tighten the script up if needed.

## Commands

The Plugin has two commands:

1. It splits the note in the line your Cursor is and names it 'unknown' with an index counting up.
2. It splits the note in the line your Cursor is and names it by taking the first 40 characters of the line, sanitizes it and adds an index counting up.

It's up to you to define Hotekeys for these two commands or not.

You can always call up the command window with cmd+p (on a mac, windows uses strg I think) and type in split-note and then choose between 
1. Extract Note
2. Extract Note with first 40 characters as filename.

## Suggestions
As much as I would like to incorporate any suggestions I don't know if I can and the functionality right now is exactly as intendend.
In my firt version I tried to split a note at the cursor psoition, and that worked, but I couldn't get the text removed from the original note.
'replaceRange' just didn't take the column into account. But in the end it's even better like it is now, as I don't have to fiddle around with the positioning of the cursor.

One thing I would like to add is the functionality to merge the selected notes into the first note selected. Just being the logical counterpart of split note. But I haven't been succesfull in doing so, so for now I'm afraid this won't be added.

