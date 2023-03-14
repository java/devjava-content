---
id: api.datetime.clock
title: Clock
slug: learn/date-time/clock
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- Clock {clock}
description: "A brief overview of the Clock class. You can use this class to provide an alternative clock to the system clock."
---


Most temporal-based objects provide a no-argument `now()` method that provides the current date and time using the system clock and the default time zone. These temporal-based objects also provide a one-argument `now(Clock)` method that allows you to pass in an alternative [`Clock`](javadoc:Clock).

The current date and time depends on the time-zone and, for globalized applications, a [`Clock`](javadoc:Clock) is necessary to ensure that the date/time is created with the correct time-zone. So, although the use of the [`Clock`](javadoc:Clock) class is optional, this feature allows you to test your code for other time zones, or by using a fixed clock, where time does not change.

The [`Clock`](javadoc:Clock) class is abstract, so you cannot create an instance of it. The following factory methods can be useful for testing.

- [`Clock.offset(Clock, Duration)`](javadoc:Clock.offset(Clock,Duration)) returns a clock that is offset by the specified [`Duration`](javadoc:Duration).
- [`Clock.systemUTC()`](javadoc:Clock.systemUTC()) returns a clock representing the Greenwich/UTC time zone.
- [`Clock.fixed(Instant, ZoneId)`](javadoc:Clock.fixed(Instant,ZoneId)) always returns the same Instant. For this clock, time stands still.
