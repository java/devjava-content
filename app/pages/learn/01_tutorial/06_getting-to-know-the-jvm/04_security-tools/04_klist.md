---
id: jvm.security_tool.klist
title: Klist - Displaying Your Key Table
slug: learn/jvm/tool/security/klist
slug_history:
- security/klist
group_title: The Security Tools
type: tutorial-group
group: security-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Klist {intro}
- Synopsis {synopsis}
- Description {description}
- Commands {commands}
- Examples {examples}
description: "Displaying the entries in the local credentials cache and key table."
---


<a id="intro">&nbsp;</a>
## Introducing Klist
[klist](doc:klist) - display the entries in the local credentials cache and key table


<a id="synopsis">&nbsp;</a>
## Synopsis

```shell
klist [-c [-f] [-e] [-a [-n]]] [-k [-t] [-K]] [name] [-help]
```

<a id="description">&nbsp;</a>
## Description

The `klist` tool displays the entries in the local credentials cache and key table.
After you modify the credentials cache with the `kinit` tool or modify the keytab with the `ktab` tool,
the only way to verify the changes is to view the contents of the credentials cache or keytab using the `klist` tool.
The `klist` tool doesn't change the Kerberos database.


<a id="commands">&nbsp;</a>
## Commands

`-c`

Specifies that the credential cache is to be listed.

The following are the options for credential cache entries:

`-f`

Show credential flags.

`-e`

Show the encryption type.

`-a`

Show addresses.

`-n`

If the `-a` option is specified, don't reverse resolve addresses.

`-k`

Specifies that key tab is to be listed.

List the keytab entries. The following are the options for keytab entries:

`-t`

Show keytab entry timestamps.

`-K`

Show keytab entry DES keys.

`-e`

Shows keytab entry key type.

_name_

Specifies the credential cache name or the keytab name. File-based cache or keytab's prefix is `FILE:`.
If the name isn't specified, the `klist` tool uses default values for the cache name and keytab.
The `kinit` documentation lists these default values.

`-help`

Displays instructions.


<a id="examples">&nbsp;</a>
## Examples

List entries in the keytable specified including keytab entry timestamps and DES keys:
```shell
klist -k -t -K FILE:\temp\mykrb5cc
```

List entries in the credentials cache specified including credentials flag and address list:
```shell
klist -c -f FILE:\temp\mykrb5cc
```
