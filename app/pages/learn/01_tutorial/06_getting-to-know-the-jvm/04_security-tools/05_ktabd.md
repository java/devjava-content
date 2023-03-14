---
id: jvm.security_tool.ktabd
title: Ktab - Managing Your Local Key Table
slug: learn/jvm/tool/security/ktabd
slug_history:
- security/ktabd
group_title: The Security Tools
type: tutorial-group
group: security-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Ktabd {intro}
- Synopsis {synopsis}
- Description {description}
- Security Alert {security-alert}
- Commands and Options {commands-and-options}
- Common Options {common-options}
- Examples {examples}
description: "Managing the principal names and service keys stored in a local key table."
---

<a id="intro">&nbsp;</a>
## Introducing ktab
[ktab](doc:ktab) - manage the principal names and service keys stored in a local key table

<a id="synopsis">&nbsp;</a>
## Synopsis
```shell
ktab [commands] [options]
```


`[commands] [options]`
Lists the keytab name and entries, adds new key entries to the keytab, deletes existing key entries, and displays instructions. See [Commands and Options](#commands-and-options).

<a id="description">&nbsp;</a>
## Description

The `ktab` enables the user to manage the principal names and service keys stored in a local key table.
Principal and key pairs listed in the keytab enable services running on a host to authenticate themselves to the Key Distribution Center (KDC).
Before configuring a server to use Kerberos, you must set up a keytab on the host running the server.
Note that any updates made to the keytab using the `ktab` tool don't affect the Kerberos database.

A _keytab_ is a host's copy of its own keylist, which is analogous to a user's password. An application server that needs to authenticate itself to the Key Distribution Center (KDC) must have a keytab which contains its own principal and key. If you change the keys in the keytab, you must also make the corresponding changes to the Kerberos database. The `ktab` tool enables you to list, add, update or delete principal names and key pairs in the key table. None of these operations affect the Kerberos database.

<a id="security-alert">&nbsp;</a>
## Security Alert

Don't specify your password on the command line. Doing so can be a security risk. For example, an attacker could discover your password while running the UNIX `ps` command.
Just as it is important for users to protect their passwords, it is equally important for hosts to protect their keytabs.
You should always store keytab files on the local disk and make them readable only by root. You should never send a keytab file over a network in the clear.

<a id="commands-and-options">&nbsp;</a>
## Commands and Options

`-l [-e] [-t]`

Lists the keytab name and entries. When `-e` is specified, the encryption type for each entry is displayed. When `-t` is specified, the timestamp for each entry is displayed.

`-a principal_name [password] [-n kvno] [-append]`

Adds new key entries to the keytab for the given principal name with an optional _password_.
If a _kvno_ is specified, new keys' Key Version Numbers equal to the value, otherwise, automatically incrementing the Key Version Numbers.
If `-append` is specified, new keys are appended to the keytab, otherwise, old keys for the same principal are removed.

No changes are made to the Kerberos database. **Don't specify the password on the command line or in a script.** This tool will prompt for a password if it isn't specified.

`-d principal_name [-f] [-e etype] [kvno | all| old]`
Deletes key entries from the keytab for the specified principal. No changes are made to the Kerberos database.

*   If _kvno_ is specified, the tool deletes keys whose Key Version Numbers match kvno. If `all` is specified, delete all keys.
*   If `old` is specified, the tool deletes all keys except those with the highest _kvno_. The default action is `all`.
*   If _etype_ is specified, the tool only deletes keys of this encryption type.
    _etype_ should be specified as the numberic value _etype_ defined in RFC 3961, section 8.
    A prompt to confirm the deletion is displayed unless `-f` is specified.


When _etype_ is provided, only the entry matching this encryption type is deleted. Otherwise, all entries are deleted.

`-help`

Displays instructions.

<a id="common-options">&nbsp;</a>
## Common Options

This option can be used with the `-l`, `-a` or `-d` commands.

`-k keytab name`

Specifies the keytab name and path with the `FILE:` prefix.

<a id="examples">&nbsp;</a>
## Examples

*   Lists all the entries in the default keytable
```shell
ktab -l
```

*   Adds a new principal to the key table (note that you will be prompted for your password)
```shell
ktab -a [[email protected]](/cdn-cgi/l/email-protection)
```

*   Deletes a principal from the key table
```shell
ktab -d [[email protected]](/cdn-cgi/l/email-protection)
```
