---
id: api.datetime.non_iso_conversion
title: Non-ISO Date Conversion
slug: learn/date-time/non-iso-conversion
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- Converting to a Non-ISO-Based Date {to-non-iso}
- Converting to an ISO-Based Date {to-iso}
description: "How to convert from a date in the ISO calendar system to a date in a non-ISO calendar system, such as a JapaneseDate or a ThaiBuddhistDate."
---


This tutorial does not discuss the [`java.time.chrono`](javadoc:java.time.chrono) package in any detail. However, it might be useful to know that this package provides several predefined chronologies that are not ISO-based, such as Japanese, Hijrah, Minguo, and Thai Buddhist. You can also use this package to create your own chronology.

This section shows you how to convert between an ISO-based date and a date in one of the other predefined chronologies.


<a id="to-non-iso">&nbsp;</a>
## Converting to a Non-ISO-Based Date

You can convert an ISO-based date to a date in another chronology by using the `from(TemporalAccessor)` factory method, such as [`JapaneseDate.from(TemporalAccessor)`](javadoc:JapaneseDate.from(TemporalAccessor)). This method throws a [`DateTimeException`](javadoc:DateTimeException) if it is unable to convert the date to a valid instance. The following code converts a [`LocalDateTime`](javadoc:LocalDateTime) instance to several predefined non-ISO calendar dates:

```java
LocalDateTime date     = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
JapaneseDate jdate     = JapaneseDate.from(date);
HijrahDate hdate       = HijrahDate.from(date);
MinguoDate mdate       = MinguoDate.from(date);
ThaiBuddhistDate tdate = ThaiBuddhistDate.from(date);
```

The following example converts from a [`LocalDate`](javadoc:LocalDate) to a [`ChronoLocalDate`](javadoc:ChronoLocalDate) to a [`String`](javadoc:String) and back. This `toString()` method takes an instance of [`LocalDate`](javadoc:LocalDate) and a [`Chronology`](javadoc:Chronology) and returns the converted string by using the provided [`Chronology`](javadoc:Chronology). The [`DateTimeFormatterBuilder`](javadoc:DateTimeFormatterBuilder) is used to build a string that can be used for printing the date:

```java
/**
 * Converts a LocalDate (ISO) value to a ChronoLocalDate date
 * using the provided Chronology, and then formats the
 * ChronoLocalDate to a String using a DateTimeFormatter with a
 * SHORT pattern based on the Chronology and the current Locale.
 *
 * @param localDate - the ISO date to convert and format.
 * @param chrono - an optional Chronology. If null, then IsoChronology is used.
 */
public static String toString(LocalDate localDate, Chronology chrono) {
    if (localDate != null) {
        Locale locale = Locale.getDefault(Locale.Category.FORMAT);
        ChronoLocalDate cDate;
        if (chrono == null) {
            chrono = IsoChronology.INSTANCE;
        }
        try {
            cDate = chrono.date(localDate);
        } catch (DateTimeException ex) {
            System.err.println(ex);
            chrono = IsoChronology.INSTANCE;
            cDate = localDate;
        }
        DateTimeFormatter dateFormatter =
            DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
                             .withLocale(locale)
                             .withChronology(chrono)
                             .withDecimalStyle(DecimalStyle.of(locale));
        String pattern = "M/d/yyyy GGGGG";
        return dateFormatter.format(cDate);
    } else {
        return "";
    }
}
```

When the method is invoked with the following date for the predefined chronologies:

```java
LocalDate date = LocalDate.of(1996, Month.OCTOBER, 29);
System.out.printf("%s%n",
     StringConverter.toString(date, JapaneseChronology.INSTANCE));
System.out.printf("%s%n",
     StringConverter.toString(date, MinguoChronology.INSTANCE));
System.out.printf("%s%n",
     StringConverter.toString(date, ThaiBuddhistChronology.INSTANCE));
System.out.printf("%s%n",
     StringConverter.toString(date, HijrahChronology.INSTANCE));
```

The ouput looks like this:

```shell
10/29/0008 H
10/29/0085 1
10/29/2539 B.E.
6/16/1417 1
```


<a id="to-iso">&nbsp;</a>
## Converting to an ISO-Based Date

You can convert from a non-ISO date to a [`LocalDate`](javadoc:LocalDate) instance using the static [`LocalDate.from()`](javadoc:LocalDate.from()) method, as shown in the following example:

```java
LocalDate date = LocalDate.from(JapaneseDate.now());
```

Other temporal-based classes also provide this method, which throws a [`DateTimeException`](javadoc:DateTimeException) if the date cannot be converted.

The following `fromString()` method, parses a [`String`](javadoc:String) containing a non-ISO date and returns a [`LocalDate`](javadoc:LocalDate) instance.

<a id="example">&nbsp;</a>
```java
/**
 * Parses a String to a ChronoLocalDate using a DateTimeFormatter
 * with a short pattern based on the current Locale and the
 * provided Chronology, then converts this to a LocalDate (ISO)
 * value.
 *
 * @param text   - the input date text in the SHORT format expected
 *                 for the Chronology and the current Locale.
 *
 * @param chrono - an optional Chronology. If null, then IsoChronology
 *                 is used.
 */
public static LocalDate fromString(String text, Chronology chrono) {
    if (text != null && !text.isEmpty()) {
        Locale locale = Locale.getDefault(Locale.Category.FORMAT);
        if (chrono == null) {
           chrono = IsoChronology.INSTANCE;
        }
        String pattern = "M/d/yyyy GGGGG";
        DateTimeFormatter df = new DateTimeFormatterBuilder().parseLenient()
                              .appendPattern(pattern)
                              .toFormatter()
                              .withChronology(chrono)
                              .withDecimalStyle(DecimalStyle.of(locale));
        TemporalAccessor temporal = df.parse(text);
        ChronoLocalDate cDate = chrono.date(temporal);
        return LocalDate.from(cDate);
    }
    return null;
}
```

When the method is invoked with the following strings:

```java
System.out.printf("%s%n", StringConverter.fromString("10/29/0008 H",
    JapaneseChronology.INSTANCE));
System.out.printf("%s%n", StringConverter.fromString("10/29/0085 1",
    MinguoChronology.INSTANCE));
System.out.printf("%s%n", StringConverter.fromString("10/29/2539 B.E.",
    ThaiBuddhistChronology.INSTANCE));
System.out.printf("%s%n", StringConverter.fromString("6/16/1417 1",
    HijrahChronology.INSTANCE));
```

The printed strings should all convert back to October 29th, 1996:

```shell
1996-10-29
1996-10-29
1996-10-29
1996-10-29
```
