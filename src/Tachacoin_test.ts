import "mocha"

import { assert } from "chai"

import { rpcURL, repoData } from "./test"
import { Tachacoin } from "./Tachacoin"
import { Contract } from "./Contract"

describe("Tachacoin", () => {
  const tachacoin = new Tachacoin(rpcURL, repoData)

  it("can instantiate a contract", () => {
    const contract = tachacoin.contract("test/contracts/Methods.sol")
    assert.instanceOf(contract, Contract)
  })

  it("throws an error if contract is not known", () => {
    // assertThrow
    assert.throw(() => {
      tachacoin.contract("test/contracts/Unknown.sol")
    })
  })
})
