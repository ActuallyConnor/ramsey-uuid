/**
 * A UUID is a universally unique identifier adhering to an agreed-upon representation format and standard
 * for generation
 */
export interface UuidInterface
{
  /**
   * Returns the Array-like collection of 16 values (starting from offset) between 0-255
   *
   * @return ArrayLike<number>
   */
  getUuid (): ArrayLike<number>;

  /**
   * Returns -1, 0, or 1 if the UUID is less than, equal to, or greater than the other UUID
   *
   * The first of two UUIDs is greater than the second if the most significant field in which the UUIDs differ
   * is greater for the first UUID.
   *
   * * Q. What's the value of being able to sort UUIDs?
   * * A. Use them as keys in a B-Tree or similar mapping.
   * @param other The UUID to compare
   *
   * @return number -1, 0, or 1 if the UUID is less than, equal to, or greater than the other
   */
  compareTo (other: UuidInterface): number;

  /**
   * Returns true if the UUID is equal to the provided object
   *
   * The result is true if and only if the argument is not null, is a UUID object, has the same variant, and contains
   * the same value, bit for bit, as the UUID.
   *
   * @param other An object to test for equality with this UUID
   *
   * @return boolean True if the other object is equal to this UUID
   */
  equals (other: object | null): boolean;

  /**
   * Returns the string standard representation of the UUID
   *
   * @return string
   */
  toString (): string;

  /**
   * Returns the hexadecimal representation of the UUID
   *
   * @return string
   */
  getHex (): string;

  /**
   * Returns the binary string representation of the UUID
   *
   * @return string
   */
  getBytes (): string;
}
