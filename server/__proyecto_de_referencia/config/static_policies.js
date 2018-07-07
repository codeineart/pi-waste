/**
 * This is gonna be used in he future. Time is money right now.
 */

/**
 * - can a 'worker' role, with 'A' and 'B' permissions, 'READ' -> 'B_NEWS'
 * - can an 'admin' role, 'WRITE' -> 'B_NEWS'
 */

export class ABAC {
  constructor () {}
  /**
   * - Construction of policy and store it in database AND memory.
   * - Modifications to the policy.
   * - PEP: Policy enforcement point -> Middleware for capturing request arriving to express.
   * - PDP: *Thinking is here*
   * - PIP: Policy information point -> DB connection, creation/destruction of policy object.
   *
   */
}
