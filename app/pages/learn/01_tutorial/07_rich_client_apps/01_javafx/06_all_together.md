---
id: javafx.fundamentals.all
title: Putting all together
slug: learn/javafx/all
type: tutorial-group
group: rich-client-apps
category: javafx
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Overview {overview}
- Master-Detail UI {master-detail-ui}
- The Model {model}
- Observable Lists {observable-lists}
- Implementing ListView Selection {list-view-selection}
- Using Multiple Selection {multiple-selection}
- ListView and Sort {list-view-sort}
- Person UI Application Actions {app-actions}
- Person UI with Records {app-records}
- Key Point Summary {summary}
description: "Control nodes by manipulating their properties. "
last_update: 2023-09-12
author: ["GailC.Anderson", "PaulAnderson"]
byline: 'and is from <a href="https://link.springer.com/book/10.1007/978-1-4842-7268-8">The Definitive Guide to Modern Java Clients with JavaFX 17</a> graciously contributed by Apress.'
---

<a id="overview">&nbsp;</a>
## Overview

It’s time to build a more interesting JavaFX application now, one that implements a master-detail view. As we show you this application, we’ll explain several JavaFX features that help you control the UI and keep your data and the application consistent.

First, we use Scene Builder to construct and configure the UI. Our example includes a `Person` model class and an underlying `ObservableList` that holds data. The program lets users make changes, but we don’t persist any data. 
JavaFX has `ObservableLists` that manage collections of data, and you can write listeners and bind expressions that respond to any data changes. The program uses a combination of event handlers and bind expressions to keep the application state consistent.
<a id="master-detail-ui">&nbsp;</a>
## Master-Detail UI

For the UI, we use a JavaFX ListView control in the left window (the master view) and a `Form` on the right (the detail view). In Scene Builder, we select an `AnchorPane` as the top-level component and the scene graph root. 
A `SplitPane` layout pane divides the application view into two parts, and each part has `AnchorPane` as its main container. 

[![Person UI application](/assets/images/javafx/person-ui-app.png)](/assets/images/javafx/person-ui-app.png)

The `ListView` control lets you perform selections for a `Person` object. Here, the first `Person` is selected, and the details of that `Person` appear in the form control on the right.
The form control has the following layout:
*	The form contains a `GridPane` (two columns by four rows) that holds `TextFields` for the firstname and lastname fields of `Person`.
*	A `TextArea` holds the notes field for `Person`. Labels in the first column mark each of these controls.
*	The bottom row of the `GridPane` consists of a `ButtonBar` that spans both columns and aligns on the right side by default. The `ButtonBar` sizes all of its buttons to the width of the widest button label so the buttons have a uniform size.
*	The buttons let you perform New (create a `Person` and add that `Person` to the list), Update (edit a selected `Person`), and Delete (remove a selected `Person` from the list).
*	Bind expressions query the state of the application and enable or disable the buttons.

The hierarchical view of our scene graph for the Person UI application looks like following:

[![Person UI scene graph hierarchy](/assets/images/javafx/person-ui-scene-graph.png)](/assets/images/javafx/person-ui-scene-graph.png)

The file structure of the application is listed below:

[![Person UI application file structure](/assets/images/javafx/person-ui-file-struct.png)](/assets/images/javafx/person-ui-file-struct.png)

`Person.java` contains the `Person` model code, and `SampleData.java` provides the data to initialize the application. `FXMLController.java` is the JavaFX controller class, and `PersonUI.java` holds the main application class. Under resources, the FXML file `Scene.fxml` describes the UI.
<a id="model">&nbsp;</a>
## The Model

The `Person` class is the "model: we use for this application.

```java
package org.modernclient.model;
import javafx.beans.Observable;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.util.Callback;
import java.util.Objects;
public class Person {
    private final StringProperty firstname = new SimpleStringProperty(
           this, "firstname", "");
    private final StringProperty lastname = new SimpleStringProperty(
           this, "lastname", "");
    private final StringProperty notes = new SimpleStringProperty(
           this, "notes", "sample notes");
    public Person() {
    }
    public Person(String firstname, String lastname, String notes) {
        this.firstname.set(firstname);
        this.lastname.set(lastname);
        this.notes.set(notes);
    }
    public String getFirstname() {
        return firstname.get();
    }
    public StringProperty firstnameProperty() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname.set(firstname);
    }
    public String getLastname() {
        return lastname.get();
    }
    public StringProperty lastnameProperty() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname.set(lastname);
    }
    public String getNotes() {
        return notes.get();
    }
    public StringProperty notesProperty() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes.set(notes);
    }
    @Override
    public String toString() {
        return firstname.get() + " " + lastname.get();
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return Objects.equals(firstname, person.firstname) &&
                Objects.equals(lastname, person.lastname) &&
                Objects.equals(notes, person.notes);
    }
    @Override
    public int hashCode() {
        return Objects.hash(firstname, lastname, notes);
    }
}
```
<a id="observable-lists">&nbsp;</a>
## Observable Lists

When working with JavaFX collections, you’ll typically use `ObservableLists` that detect list changes with listeners. Furthermore, the JavaFX controls that display lists of data expect observable lists. 
These controls automatically update the UI in response to list modifications. We’ll explain some of these intricacies as we walk you through our example program.
<a id="list-view-selection">&nbsp;</a>
## Implementing ListView Selection

A `ListView` control displays items in an observable list and lets you select one or possibly multiple items. To display a selected `Person` in the form fields in the right view, you use a change listener for the `selectedItemProperty`. 
This change listener is invoked each time the user either selects a different item from the `ListView` or deselects the selected item. You can use the mouse for selecting, as well as the arrow keys, Home (for the first item), and End (for the last item). 
On a Mac, use Fn + Left Arrow for Home and Fn + Right Arrow for End. For deselecting (either Command-click for a Mac or Control-click on Linux or Windows), the new value is null, and we clear all the form control fields. 
Below you can observe the `ListView` selection change listener.

```java
listView.getSelectionModel().selectedItemProperty().addListener(
        personChangeListener = (observable, oldValue, newValue) -> {
            // newValue can be null if nothing is selected
            selectedPerson = newValue;
            modifiedProperty.set(false);
            if (newValue != null) {
                // Populate controls with selected Person
                firstnameTextField.setText(selectedPerson.getFirstname());
                lastnameTextField.setText(selectedPerson.getLastname());
                notesTextArea.setText(selectedPerson.getNotes());
            } else {
                firstnameTextField.setText("");
                lastnameTextField.setText("");
                notesTextArea.setText("");
            }
		});
```

Boolean property `modifiedProperty` tracks whether the user has changed any of the three text controls in the form. We reset this flag after each `ListView` selection and use this property in a bind expression to control the Update button’s disable property.
<a id="multiple-selection">&nbsp;</a>
## Using Multiple Selection

By default, a `ListView` control implements single selection so at most one item can be selected. `ListView` also provides multiple selection, which you enable by configuring the selection mode, as follows:

```java
listView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
```

With this setting, each time the user adds another item to the selection with CTRL-Shift or CTRL-Command, the `selectedItemProperty` listener is invoked with the new selection. 
The `getSelectedItems()` method returns all of the currently selected items, and the newValue argument is the most recently selected value. For example, the following change listener collects multiple selected items and prints them:

```java
listView.getSelectionModel().selectedItemProperty().addListener(
		personChangeListener = (observable, oldValue, newValue) -> {
			ObservableList<Person> selectedItems = listView.getSelectionModel().getSelectedItems();
			// Do something with selectedItems
        // System.out.println(selectedItems);
});
```
Our Person UI application uses single selection mode for the ListView.
<a id="list-view-sort">&nbsp;</a>
## ListView and Sort

Suppose you want to sort the list of names by last name and then first name. JavaFX has several ways to sort lists. Since we need to keep names sorted, we’ll wrap the underlying `ObservableArrayList` in a `SortedList`. 
To keep the list sorted in ListView, we invoke `ListView`’s setItems() method with the sorted list. A comparator specifies the ordering. 
First, we compare each person’s last name for sorting and then the first names if necessary. To set the sorting, the `setComparator()` method uses an anonymous class or, more succinctly, a lambda expression:

```java
// Use a sorted list; sort by lastname; then by firstname
SortedList<Person> sortedList = new SortedList(personList);
sortedList.setComparator((p1, p2) -> {
	int result = p1.getLastname().compareToIgnoreCase(p2.getLastname());
	if (result == 0) {
		result = p1.getFirstname().compareToIgnoreCase(p2.getFirstname());
	}
	return result;
});
listView.setItems(sortedList);
```

Note that the comparator arguments p1 and p2 are inferred as `Person` types since `SortedList` is generic.
<a id="app-actions">&nbsp;</a>
## Person UI Application Actions

Our Person UI application implements three actions: Delete (remove the selected `Person` object from the underlying list), New (create a `Person` object and add it to the underlying list), and Update (make changes to the selected `Person` object and update the underlying list). 
Let’s go over each action in detail, with an eye toward learning more about the JavaFX features that help you build this type of application.

### Delete a Person

The controller class includes an action event handler for the Delete button. Here’s the FXML snippet that defines the Delete button:

```xml
<Button fx:id="removeButton" mnemonicParsing="false"
onAction="#removeButtonAction" text="Delete" />
```

The `fx:id` attribute names the button so the JavaFX controller class can access it. The `onAction` attribute corresponds to the `ActionEvent` handler in the controller code. We’re not using keyboard shortcuts in this application, so we set attribute `mnemonicParsing` to false.

---
**NOTE**

When mnemonic parsing is true, you can specify a keyboard shortcut to activate a labeled control, such as Alt-F to open a File menu, for example. You define the keyboard shortcut by preceding the targeted letter with an underbar character in the label.

---

You cannot update a `SortedList` directly, but you can apply changes to its underlying list (`ObservableList personList`). The `SortedList` always keeps its elements sorted whenever you add or delete items.

Here is the event handler in the controller class:

```java
@FXML
private void removeButtonAction(ActionEvent actionEvent) {
    personList.remove(selectedPerson);
}
```

This handler removes the selected `Person` object from the backing observable array list. The `ListView` control’s selection change listener sets `selectedPerson`.

Note that we don’t have to check `selectedPerson` against null here. Why not? You’ll see that we disable the Delete button when the `selectedItemProperty` is null. 
This means the Delete button’s action event handler can never be invoked when the user deselects an element in the ListView control. Here’s the bind expression that controls the Delete button’s disable property:

```java
removeButton.disableProperty().bind(
listView.getSelectionModel().selectedItemProperty().isNull());
```

This elegant statement makes the event handler more compact and subsequently less error prone. Both the button `disableProperty` and the selection model `selectedItemProperty` are JavaFX observables. 
You can therefore use them in bind expressions. The property that invokes `bind()` automatically updates when the `bind()` arguments’ values change.

### Add a Person

The New button adds a `Person` to the list and subsequently updates the `ListView` control. A new item is always sorted because the list re-sorts when elements are added to the wrapped list. 
Here is the FXML that defines the New button. Similar to the Delete button, we define both the `fx:id` and `onAction` attributes:

```java
<Button fx:id="createButton" mnemonicParsing="false" onAction="#createButtonAction" text="New" />
```

Under what circumstances should we disable the New button?
*	When clicking New, no items in the `ListView` should be selected. Therefore, we disable the New button if the `selectedItemProperty` is not null. Note that you can deselect the selected item with Command-click or Control-click.
*	We should not create a new `Person` if either the first or last name field is empty. So we disable the New button if either of these fields is empty. We do allow the Notes field to be empty, however.
Here is the bind expression that implements these restrictions:

```java
createButton.disableProperty().bind(
		listView.getSelectionModel().selectedItemProperty().isNotNull()
            .or(firstnameTextField.textProperty().isEmpty()
            .or(lastnameTextField.textProperty().isEmpty())));

```

Now let’s show you the New button event handler:

```java
@FXML
private void createButtonAction(ActionEvent actionEvent) {
    Person person = new Person(firstnameTextField.getText(),
        lastnameTextField.getText(), notesTextArea.getText());
	personList.add(person);
	// and select it
    listView.getSelectionModel().select(person);
}
```
First, we create a new `Person` object using the form’s text controls and add this `Person` to the wrapped list (`ObservableList personList`). To make the `Person`’s data visible and editable right away, we select the newly added `Person`.

### Update a Person

An update of a `Person` is not as straightforward as the other operations. Before we delve into the details of why, let’s first look at the Update button’s FXML code, which is similar to the other buttons:

```xml
<Button fx:id="updateButton" mnemonicParsing="false" 
        onAction="#updateButtonAction" text="Update" />
```

By default, a sorted list does not respond to individual array elements that change. For example, if `Person` "Ethan Nieto" changes to "Ethan Abraham", the list will not re-sort the way it does when items are added or removed. 
There’s two ways to fix this. First is to remove the item and add it back again with the new values.

The second way is to define an extractor for the underlying object. An extractor defines properties that should be observed when changes occur. Normally, changes to individual list elements are not observed. Observable objects returned by the extractor flag update changes in a list ChangeListener. 
Thus, to make a `ListView` control display a properly sorted list after changes to individual elements, you need to define an `ObservableList` with an extractor.

The benefit of extractors is that you only include the properties that affect sorting. In our example, properties firstname and lastname affect the list’s order. These properties should go in the extractor.

An extractor is a static callback method in the model class. Here’s the extractor for our `Person` class:

```java
public class Person {
	...
    public static Callback<Person, Observable[]> extractor =
        p-> new Observable[] {p.lastnameProperty(), p.firstnameProperty()};
}
```

Now the controller class can use this extractor to declare an `ObservableList` called `personList`, as follows:

```java
private final ObservableList<Person> personList =
        FXCollections.observableArrayList(Person.extractor);
```

With the extractor set up, the sorted list detects changes in both `firstnameProperty` and `lastnameProperty` and re-sorts as needed.

Next, we define when the Update button is enabled. In our application, the Update button should be disabled if no items are selected or if either the `firstname` or `lastname` text field becomes empty. 
And finally, we disable Update if the user has not yet made changes to the form’s text components. We track these changes with a JavaFX Boolean property called modifiedProperty, created with the JavaFX Boolean property helper class, `SimpleBooleanProperty`. 
We initialize this Boolean to false in the JavaFX controller class, as follows:

```java
private final BooleanProperty modifiedProperty = new SimpleBooleanProperty(false);
```

We reset this Boolean property to false in the `ListView` selection change listener. The `modifiedProperty` is set to true when a keystroke occurs in any of the three fields that can change: the first name, last name, and notes controls. 
Here is the keystroke event handler, which is invoked when a key stroke is detected inside the focus for each of these three controls:

```java
@FXML
private void handleKeyAction(KeyEvent keyEvent) {
	modifiedProperty.set(true);
}
```

Of course, the FXML markup must configure attribute `onKeyReleased` for all three text controls to invoke the keystroke event handler. Here is the FXML for the firstname `TextField`, which links the `handleKeyAction` event handler to a key release event for this control:

```xml
<TextField fx:id="firstnameTextField" onKeyReleased="#handleKeyAction" 
           prefWidth="248.0" 
           GridPane.columnIndex="1" 
           GridPane.hgrow="ALWAYS" />
```

And here is the bind expression for the Update button, which is disabled if the `selectedItemProperty` is null, the `modifiedProperty` is false, or the text controls are empty:

```java
updateButton.disableProperty().bind(
		listView.getSelectionModel().selectedItemProperty().isNull()
            .or(modifiedProperty.not())
            .or(firstnameTextField.textProperty().isEmpty()
            .or(lastnameTextField.textProperty().isEmpty())));
```

Now let’s show you the Update button’s action event handler. This handler is invoked when the user clicks the Update button after selecting an item in the `ListView` control and making at least one change to any of the text fields.


But there is one more housekeeping chore to do. Before starting the update of the selected item with the values from the form controls, we must remove the listener on the `selectedItemProperty`. 
Why? Recall that changes to the `firstname` or `lastname` properties will affect the list dynamically and possibly re-sort it. Furthermore, this may change `ListView`’s idea of the currently selected item and invoke the `ChangeListener`. 
To prevent this, we remove the listener during the update and add the listener back when the update finishes. During the update, the selected item remains unchanged (even if the list re-sorts). 
Thus, we clear the `modifiedProperty` flag to ensure the Update button gets disabled:

```java
@FXML
private void updateButtonAction(ActionEvent actionEvent) {
    Person p = listView.getSelectionModel().getSelectedItem();
    listView.getSelectionModel().selectedItemProperty()
                 .removeListener(personChangeListener);
    p.setFirstname(firstnameTextField.getText());
    p.setLastname(lastnameTextField.getText());
    p.setNotes(notesTextArea.getText());
    listView.getSelectionModel().selectedItemProperty()
                 .addListener(personChangeListener);
    modifiedProperty.set(false);
}
```
<a id="app-records">&nbsp;</a>
## Person UI with Records

One of the exciting new features in Java 16 is records. Records allow you to model classes that hold immutable data and describe state, often with a single line of code. 
Let’s refactor our Person UI example to use Java records for the `Person` model class. We do this for several reasons.
*	Modern Java clients with JavaFX will continue to evolve as applications leverage new Java features. Afterall, JavaFX is implemented with Java APIs and can certainly take advantage of new features as they become available.
*	Our UI example is a good candidate for records, since using a Person record instead of a class is a straightforward approach.
*	We originally implemented `Person` with JavaFX properties, which are observable and mutable. But, in the context of our application, is this mutability necessary or even desirable?
•	Java records help make your code more readable, since often a single line defines the state of your model class.

### Person Record

We declare a record with its name and its immutable components; each component has a name and type. These components are final instance fields in the generated class. 
Java generates accessor methods for the fields, a constructor, and default implementations for methods `equals()`, `hashCode()`, and `toString()`.

Here’s the new `Person` class, which is much shorter than the non-record version:

```java
public record Person (String firstname, String lastname, String notes) {
    @Override
    public String toString() {
        return firstname + " " + lastname;
    }
}
```

Note that we supply our own `toString()` implementation to replace the auto-generated `toString()`, since `ListView` uses this to display each `Person` object. 
The generated accessor methods are `firstname()`, `lastname()`, and `notes()` to match the elements declared in the record header. We update our application to use these names instead of the conventional getter forms. 
This affects the `selectedItemProperty` change listener and the sorted list comparator.

No changes are necessary to the `createButtonAction` or `removeButtonAction` event handlers. There is also no change to the code that creates our sample list of `Person` objects (`SampleData.java`).

Records do require changes to the `updateButtonAction` event handler, however. Since a `Person` object is now immutable, we cannot update its fields. Therefore, to update a `Person`, we must create a new `Person` object, remove the old one, and add the new one to the backing list. 
The sorted list automatically updates with the new data. Here is the new `updateButtonAction` event handler.

```java
@FXML
private void updateButtonAction(ActionEvent actionEvent) {
	Person person = new Person(firstnameTextField.getText(), lastnameTextField.getText(), 
        notesTextArea.getText());
	personList.remove(listView.getSelectionModel().getSelectedItem());
	personList.add(person);
	listView.getSelectionModel().select(person);
	modifiedProperty.set(false);
}
```

By removing and adding a `Person`, the update process becomes simpler. The extractor to detect changes is no longer necessary, nor do we need to temporarily remove the `selectedItemProperty` change listener during updates.

By restricting `Person` to be an immutable container, we greatly simplify `Person` and the readability of our program. However, JavaFX properties and binding are still ideal features to maintain the state of the UI.
<a id="summary">&nbsp;</a>
## Key Point Summary

This series has covered a lot of ground. Let’s review the key points:
*	JavaFX is a modern UI toolkit that runs efficiently in desktop, mobile, and embedded environments.
*	JavaFX uses a theater metaphor. The runtime system creates the primary stage and invokes the `start()` method of your application.
*	You create a hierarchical scene graph and install the root node in the scene.
*	The JavaFX runtime system performs all UI updates and scene graph modifications on the JavaFX Application Thread. Any long-running work should be relegated to background tasks in separate threads to keep the UI responsive. JavaFX has a well-developed concurrency library that helps you keep UI code separate from background code.
*	JavaFX supports both 2D and 3D graphics. The origin in 2D graphics is the upper-left corner of the scene.
*	JavaFX includes a rich set of layout controls that let you arrange components in a scene. You can nest layout controls and specify resizing criteria.
*	JavaFX defines a scene graph as a hierarchical collection of Nodes. Nodes are described by their properties.
*	JavaFX properties are observable. You can attach listeners and use the rich bindings APIs to link properties to each other and detect changes.
*	JavaFX lets you define high-level animations called transitions.
*	The hierarchical nature of the scene graph means parent nodes can delegate rendering work to their children.
*	JavaFX supports a wide range of events that let you react to user inputs and changes to a scene graph.
*	While you can write JavaFX applications completely in Java, a better approach is to write visual descriptions in FXML, a markup language for specifying UI content. FXML helps separate visual code from model and controller code.
*	Each FXML file typically describes a scene and configures a controller.
