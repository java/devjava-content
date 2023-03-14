---
id: api.datetime.calendar
title: Standard Calendar
slug: learn/date-time/standard-calendar
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
aria_label: dateTimeStandardCalendar
last_update: 2022-01-27
toc:
- Standard Calendar {intro}
description: "This section compares the concepts of human time and machine time provides a table of the primary temporal-based classes in the java.time package."
---


<a id="intro">&nbsp;</a>
## Standard Calendar

There are two basic ways to represent time. One way represents time in human terms, referred to as _human time_, such as year, month, day, hour, minute and second. The other way, _machine time_, measures time continuously along a timeline from an origin, called the _epoch_, in nanosecond resolution. The Date-Time package provides a rich array of classes for representing date and time. Some classes in the Date-Time API are intended to represent machine time, and others are more suited to representing human time.

First determine what aspects of date and time you require, and then select the class, or classes, that fulfill those needs. When choosing a temporal-based class, you first decide whether you need to represent human time or machine time. You then identify what aspects of time you need to represent. Do you need a time zone? Date and time? Date only? If you need a date, do you need month, day, and year, or a subset?

> Terminology: The classes in the Date-Time API that capture and work with date or time values, such as [`Instant`](javadoc:), [`LocalDateTime`](javadoc:LocalDateTime), and [`ZonedDateTime`](javadoc:ZonedDateTime), are referred to as _temporal-based_ classes (or types) throughout this section. Supporting types, such as the [`TemporalAdjuster`](javadoc:TemporalAdjuster) interface or the [`DayOfWeek`](javadoc:DayOfWeek) enum, are not included in this definition.

For example, you might use a [`LocalDate`](javadoc:LocalDate) object to represent a birth date, because most people observe their birthday on the same day, whether they are in their birth city or across the globe on the other side of the international date line. If you are tracking astrological time, then you might want to use a `LocalDateTime` object to represent the date and time of birth, or a [`ZonedDateTime`](javadoc:ZonedDateTime), which also includes the time zone. If you are creating a time-stamp, then you will most likely want to use an [`Instant`](javadoc:Instant), which allows you to compare one instantaneous point on the timeline to another.

The following table summarizes the temporal-based classes in the [`java.time`](javadoc:java.time) package that store date and/or time information, or that can be used to measure an amount of time. A check mark in a column indicates that the class uses that particular type of data and the `toString()` Output column shows an instance printed using the `toString()` method. The Where Discussed column links you to the relevant page in the tutorial.

| Class or Enum                              | Content                                                        | toString() Output                           | Where Discussed              |
|--------------------------------------------|----------------------------------------------------------------|---------------------------------------------|------------------------------|
| [`Instant`](javadoc:Instant)               | Seconds (1)                                                    | `2013-08-20T15:16:26.355Z`                  | Instant Class                |
| [`LocalDate`](javadoc:LocalDate)           | Year, Month, Day                                               | `2013-08-20`                                | Date Classes                 |
| [`LocalDateTime`](javadoc:LocalDateTime)   | Year, Month, Day, Hour, Minutes, Seconds                       | `2013-08-20T08:16:26.937`                   | Date and Time Classes        |
| [`ZonedDateTime`](javadoc:ZonedDateTime)   | Year, Month, Day, Hour, Minutes, Seconds, Zone Offset, Zone ID | `2013-08-21T00:16:26.941+09:00[Asia/Tokyo]` | Time Zone and Offset Classes |
| [`LocalTime`](javadoc:LocalTime)           | Hour, Minutes, Seconds                                         | `08:16:26.943`                              | Date and Time Classes        |
| [`MonthDay`](javadoc:MonthDay)             | Month, Day                                                     | `--08-20`                                   | Date Classes                 |
| [`Year`](javadoc:Year)                     | Year                                                           | `2013`                                      | Date Classes                 |
| [`YearMonth`](javadoc:YearMonth)           | Year, Month                                                    | `2013-08`                                   | Date Classes                 |
| [`Month`](javadoc:Month)                   | Month                                                          | `AUGUST`                                    | DayOfWeek and Month Enums    |
| [`OffsetDateTime`](javadoc:OffsetDateTime) | Year, Month, Day, Hour, Minutes, Seconds, Zone Offset          | `2013-08-20T08:16:26.954-07:00`             | Time Zone and Offset Classes |
| [`OffsetTime`](javadoc:OffsetTime)         | Hour, Minutes, Seconds, Zone Offset                            | `08:16:26.957-07:00`                        | Time Zone and Offset Classes |
| [`Duration`](javadoc:Duration)             | Day (2), Hour (2), Minutes (2), Seconds                        | `PT20H` (20 hours)                          | Period and Duration          |
| [`Period`](javadoc:Period)                 | Year, Month, Day (3)                                           | `P10D` (10 days)                            | Period and Duration          |
``

Notes:

(1): Seconds are captured to nanosecond precision.

(2): This class does not store this information, but has methods to provide time in these units.

(3): When a Period is added to a [`ZonedDateTime`](javadoc:ZonedDateTime), daylight saving time or other local time differences are observed.
