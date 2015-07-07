![Screenshot](https://github.com/Komodo/Projects-Scope/blob/master/screenshot.png)

This adds a new search scope to Commando allowing you to easily access your
most recently used projects.

Note by default Komodo only saves your 15 most recently used projects, to change
this number you can set the "mruProjectList" preference to whataver value you
prefer.

eg.

```
require("ko/prefs").setLong("mruProjectList", 100);
```

If you are a long time Komodo user you're likely still using the old default, which
was to only save the 5 last projects, so you would probably want to increase this.

Building
========

To build the Projects scope please refer to the documentation on building an extension:

http://community.activestate.com/forum/introduction-building-komodo-extension

Note that Komodo skins need to be built using the --unjarred flag, ie.

  koext build --unjarred
  
This addon was specifically created to serve as an example for how to make your
own Commando scopes, so please feel free to copy and pick apart this code.
