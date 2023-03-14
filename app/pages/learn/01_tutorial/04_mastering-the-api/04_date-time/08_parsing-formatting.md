---
id: api.datetime.parsing_formatting
title: Parsing and Formatting
slug: learn/date-time/parsing-formatting
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- Parsing {parsing}
- Formatting {formatting}
description: "How to format and parse date and time values."
---

The temporal-based classes in the Date-Time API provide `parse()` methods for parsing a string that contains date and time information. These classes also provide `format()` methods for formatting temporal-based objects for display. In both cases, the process is similar: you provide a pattern to the [`DateTimeFormatter`](javadoc:DateTimeFormatter) to create a `formatter` object. This `formatter` is then passed to the `parse()` or `format()` method.

The [`DateTimeFormatter`](javadoc:DateTimeFormatter) class provides numerous predefined formatters, or you can define your own.

The `parse()` and the `format()` methods throw an exception if a problem occurs during the conversion process. Therefore, your parse code should catch the [`DateTimeParseException`](javadoc:DateTimeParseException) error and your format code should catch the [`DateTimeException`](javadoc:DateTimeException) error. For more information on exception handing, see the section [Catching and Handling Exceptions](id:lang.exception).

The [`DateTimeFormatter`](javadoc:DateTimeFormatter) class is both immutable and thread-safe; it can (and should) be assigned to a static constant where appropriate.

> Version Note: The [`java.time`](javadoc:java.time) date-time objects can be used directly with [`java.util.Formatter`](javadoc:Formatter) and [`String.format()`](javadoc:String.format()) by using the familiar pattern-based formatting that was used with the legacy [`java.util.Date`](javadoc:Date) and [`java.util.Calendar`](javadoc:Calendar) classes.
 

<a id="parsing">&nbsp;</a>
## Parsing

The one-argument [`parse(CharSequence)`](javadoc:LocalDate.parse(CharSequence)) method in the [`LocalDate`](javadoc:LocalDate) class uses the ISO_LOCAL_DATE formatter. To specify a different formatter, you can use the two-argument [`parse(CharSequence, DateTimeFormatter)`](javadoc:LocalDate.parse(CharSequence,DateTimeFormatter)) method. The following example uses the predefined BASIC_ISO_DATE formatter, which uses the format 19590709 for July 9, 1959.

```java
String in = ...;
LocalDate date = LocalDate.parse(in, DateTimeFormatter.BASIC_ISO_DATE);
```

You can also define a formatter using your own pattern. The following code, creates a formatter that applies a format of `MMM d yyyy`. This format specifies three characters to represent the month, one digit to represent day of the month, and four digits to represent the year. A formatter created using this pattern would recognize strings such as "Jan 3 2003" or "Mar 23 1994". However, to specify the format as `MMM dd yyyy`, with two characters for day of the month, then you would have to always use two characters, padding with a zero for a one-digit date: "Jun 03 2003".

```java
String input = ...;
try {
    DateTimeFormatter formatter =
                      DateTimeFormatter.ofPattern("MMM d yyyy");
    LocalDate date = LocalDate.parse(input, formatter);
    System.out.printf("%s%n", date);
}
catch (DateTimeParseException exc) {
    System.out.printf("%s is not parsable!%n", input);
    throw exc;      // Rethrow the exception.
}
// 'date' has been successfully parsed
```

The documentation for the [`DateTimeFormatter`](javadoc:DateTimeFormatter) class specifies the full list of symbols that you can use to specify a pattern for formatting or parsing.

The [StringConverter example](id:api.datetime.non_iso_conversion#example) on the [Non-ISO Date Conversion](id:api.datetime.non_iso_conversion) page provides another example of a date formatter.


<a id="formatting">&nbsp;</a>
## Formatting

The [`format(DateTimeFormatter)`](javadoc:String.format()) method converts a temporal-based object to a string representation using the specified format. The following code, converts an instance of [`ZonedDateTime`](javadoc:ZonedDateTime) using the format `MMM d yyy hh:mm a`. The date is defined in the same manner as was used for the previous parsing example, but this pattern also includes the hour, minutes, and a.m. and p.m. components.

```java
DateTimeFormatter format = DateTimeFormatter.ofPattern("MMM d yyyy  hh:mm a");

// Leaving from San Francisco on July 20, 2013, at 7:30 p.m.
LocalDateTime leaving = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
ZoneId leavingZone = ZoneId.of("America/Los_Angeles"); 
ZonedDateTime departure = ZonedDateTime.of(leaving, leavingZone);

try {
    String out1 = departure.format(format);
    System.out.printf("LEAVING:  %s (%s)%n", out1, leavingZone);
} catch (DateTimeException exc) {
    System.out.printf("%s can't be formatted!%n", departure);
    throw exc;
}

// Flight is 10 hours and 50 minutes, or 650 minutes
ZoneId arrivingZone = ZoneId.of("Asia/Tokyo"); 
ZonedDateTime arrival = departure.withZoneSameInstant(arrivingZone)
                                 .plusMinutes(650);

try {
    String out2 = arrival.format(format);
    System.out.printf("ARRIVING: %s (%s)%n", out2, arrivingZone);
} catch (DateTimeException exc) {
    System.out.printf("%s can't be formatted!%n", arrival);
    throw exc;
}

if (arrivingZone.getRules().isDaylightSavings(arrival.toInstant())) 
    System.out.printf("  (%s daylight saving time will be in effect.)%n",
                      arrivingZone);
else
    System.out.printf("  (%s standard time will be in effect.)%n",
                      arrivingZone);
```

The output for this example, which prints both the arrival and departure time, is as follows:

```shell
LEAVING:  Jul 20 2013  07:30 PM (America/Los_Angeles)
ARRIVING: Jul 21 2013  10:20 PM (Asia/Tokyo)
```
