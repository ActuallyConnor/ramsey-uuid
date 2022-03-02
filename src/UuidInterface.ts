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
