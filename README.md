# technical-challenge


## Task

Implement "Fake cursor" which allows user to interact with the list with hotkeys (up\down arrows, enter)



## Summary

1 hour is really short time to write a clean code for this task, so the code is pretty messy here and needs refactor.
However, all the functionality from the requirements seems to be done.
Time spent: 1:15

## Details of implementation

I used context in this task as it was set up already, so it saved me some time in the development. However, I think it's not the best idea to use context as a state manager for the proper app.
Also tried to keep the current app file structure.
This implementation is a bit overheaded, bc it should work for the different components, however, after refactor it all can be in one hook(simply have a lack of time for this)

## Found bugs

I also found a couple of bugs in your implementation and fixed them:

1. shows 0 when todo list is empty
2. doesn't quit edit mode when user start editing new todo
