/**
 * application
 *
 * Compared with the domain layer, the application layer is a very thin layer. The application layer defines the tasks to be completed by the software and should be as simple as possible.
 *
 * It does not contain task business rules or knowledge to assist task and delegate work for the next layer of domain objects.
 *
 * It does not have a status that reflects the business situation, but it can have a status that reflects the progress of a certain task by the user or program.
 *
 * Externally, it provides various application functions (services) for the presentation layer.
 *
 * Internally call the domain layer (domain objects or domain services) to complete various business logic tasks
 *
 * This layer is also very suitable for writing some task processing and log monitoring.
 **/
package uk.shef.msc8.ewaste.application;


