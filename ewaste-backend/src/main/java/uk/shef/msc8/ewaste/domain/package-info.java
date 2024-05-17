/**
 * domain
 *
 * The domain layer is mainly responsible for expressing business concepts, business status information and business rules.
 *
 * The Domain layer is the core layer of the entire system, and almost all business logic will be implemented in this layer.
 *
 * The domain model layer mainly includes the following contents:
 *
 * Entities: Objects with unique identities
 *
 * Value Objects: Objects that do not need to be uniquely identified
 *
 * Domain Services: Some behaviors cannot be classified into entity objects or value objects. They are essentially operations, not things (different from the meaning under the domain/service package in this example)
 *
 * Aggregates/Aggregate Roots:
 *
 * Aggregation refers to a set of related objects with cohesive relationships. Each aggregation has a root and boundary.
 *
 * Factories: Create complex objects and hide creation details
 *
 * Repository: Provides methods for finding and persisting objects
 */
package uk.shef.msc8.ewaste.domain;