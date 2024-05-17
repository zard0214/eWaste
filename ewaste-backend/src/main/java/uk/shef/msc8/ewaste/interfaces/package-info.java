/**
 * interfaces
 *
 * Responsible for displaying information to users and interpreting user commands
 *
 * Request the application layer to obtain the data that the user needs to display (such as obtaining product data on the home page)
 *
 * Send a command to the application layer to ask it to execute a certain user command (implement a certain business logic, such as the user wants to make a transfer)
 *
 * The user interface layer should contain the following content:
 *
 * Data Transfer Object: DTO is also often called a value object, VO, which is essentially different from the VO in the domain layer.
 *
 * DTO is the carrier of data transmission. There should not be any business logic inside. DTO is used to isolate internal domain objects from the outside world.
 *
 * Assembler: Implements mutual conversion and data exchange between DTO and domain objects, so Assembler almost always appears together with DTO.
 *
 * Facade: The purpose of Facade is to provide a coarse-grained calling interface for remote clients.
 *
 * Its main job is to delegate a user request to one or more Services for processing, which is what we often call Controller.
 *
 */
package uk.shef.msc8.ewaste.interfaces;