---
id: jvm.security_tool.kinit
title: Kinit - Obtaining and Granting Kerberos Tickets
slug: learn/jvm/tool/security/kinit
slug_history:
- security/kinit
group_title: The Security Tools
type: tutorial-group
group: security-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Kinit {intro}
- Synopsis {synopsis}
- Description {description}
- Commands {commands}
- Examples {examples}
description: "Obtaining, caching and granting Kerberos tickets. "
---


<a id="intro">&nbsp;</a>
## Introducing Kinit
[kinit](doc:kinit) - obtain and cache Kerberos ticket-granting tickets

<a id="synopsis">&nbsp;</a>
## Synopsis

Initial ticket request:
```shell
kinit [-A] [-f] [-p] [-c cache_name] [-l lifetime] [-r renewable_time] [[-k [-t keytab_file_name]] [principal] [password]
```

Renew a ticket:
```shell
kinit -R [-c cache_name] [principal]
```

<a id="description">&nbsp;</a>
## Description

This tool is similar in functionality to the `kinit` tool that is commonly found in other Kerberos implementations, such as SEAM and MIT Reference implementations. The user must be registered as a principal with the Key Distribution Center (KDC) prior to running `kinit`.

By default, on Windows, a cache file named `USER_HOME``\krb5cc_``USER_NAME` is generated.

The identifier `USER_HOME` is obtained from the `java.lang.System` property `user.home`. `USER_NAME` is obtained from the `java.lang.System` property `user.name`.
If `USER_HOME` is null, the cache file is stored in the current directory from which the program is running. `USER_NAME` is the operating system's login user name.
This user name could be different than the user's principal name.
For example, on Windows, the cache file could be `C:\Windows\Users\duke\krb5cc_duke`, in which `duke` is the `USER_NAME` and `C:\Windows\Users\duke` is the `USER_HOME`.

By default, the keytab name is retrieved from the Kerberos configuration file. If the keytab name isn't specified in the Kerberos configuration file,
the `kinit` tool assumes that the name is `USER_HOME``\krb5.keytab`

If you don't specify the password using the _password_ option on the command line, the `kinit` tool prompts you for the password.

**Note:**

The `password` option is provided only for testing purposes. Don't specify your password in a script or provide your password on the command line.
Doing so will compromise your password.

<a id="commands">&nbsp;</a>
## Commands

You can specify one of the following commands. After the command, specify the options for it.

`-A`

Doesn't include addresses.

`-f`

Issues a forwardable ticket.

`-p`

Issues a proxiable ticket.

`-c` _cache\_name_

The cache name (for example, `FILE:D:\temp\mykrb5cc`).

`-l` _lifetime_

Sets the lifetime of a ticket. The value can be one of "h:m:s", "NdNhNmNs", and "N". See the [MIT krb5 Time Duration definition](http://web.mit.edu/kerberos/krb5-1.17/doc/basic/date_format.html#duration) for more information.

`-r` _renewable\_time_

Sets the total lifetime that a ticket can be renewed.

`-R`

Renews a ticket.

`-k`

Uses keytab

`-t` _keytab\_filename_

The keytab name (for example, `D:\winnt\profiles\duke\krb5.keytab`).

_principal_

The principal name (for example, `[[email protected]](/cdn-cgi/l/email-protection)`).

_password_

The _principal_'s Kerberos password. **Don't specify this on the command line or in a script.**

Run `kinit -help` to display the instructions above.

<a id="examples">&nbsp;</a>
## Examples

Requests credentials valid for authentication from the current client host, for the default services, storing the credentials cache in the default location (`C:\Windows\Users\duke\krb5cc_duke`):
```shell
kinit [[email protected]](/cdn-cgi/l/email-protection)
```

Requests proxiable credentials for a different principal and store these credentials in a specified file cache:
```shell
kinit -l 1h -r 10h [[email protected]](/cdn-cgi/l/email-protection)
```

Requests a TGT for the specified principal that will expire in 1 hour but is renewable for up to 10 hours. Users must renew a ticket before it has expired. The renewed ticket can be renewed repeatedly within 10 hours from its initial request.
```shell
kinit -R [[email protected]](/cdn-cgi/l/email-protection)
```

Renews an existing renewable TGT for the specified principal.
```shell
kinit -p -c FILE:C:\Windows\Users\duke\credentials\krb5cc_cafebeef [[email protected]](/cdn-cgi/l/email-protection)
```

Requests proxiable and forwardable credentials for a different principal and stores these credentials in a specified file cache:
```shell
kinit -f -p -c FILE:C:\Windows\Users\duke\credentials\krb5cc_cafebeef [[email protected]](/cdn-cgi/l/email-protection)
```

Displays the help menu for the `kinit` tool:
```shell
kinit -help
```
