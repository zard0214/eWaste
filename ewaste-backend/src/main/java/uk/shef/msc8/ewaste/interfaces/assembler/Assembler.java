package uk.shef.msc8.ewaste.interfaces.assembler;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:42
 */
@FunctionalInterface
public interface Assembler<S, T> {

    void assemble(S source, T target);
}