The TACHACOIN JavaScript library for Smart Contract development.

See [documentation](https://tachacoin.github.io/tachacoinjs-doc/).

See [中文 API 文档](https://tachacoin.github.io/tachacoinjs-doc-cn/).

See [companion tutorial](https://github.com/tachacoin/tachacoinbook/blob/master/en/part2/erc20-js.md).

# Install

```
npm install tachacoinjs
```

This is a sample code snippet that transfer ERC20 tokens:

```js
import { TachacoinRPC } from "tachacoinjs"

const repoData = require("./solar.json")
const tachacoin = new Tachacoin("http://tachacoin:test@localhost:45551", repoData)

const myToken = tachacoin.contract(
  "zeppelin-solidity/contracts/token/CappedToken.sol",
)

async function transfer(fromAddr, toAddr, amount) {
  const tx = await myToken.send("transfer", [toAddr, amount], {
    senderAddress: fromAddr,
  })

  console.log("transfer tx:", tx.txid)
  console.log(tx)

  await tx.confirm(3)
  console.log("transfer confirmed")
}
```

The [full source code](https://github.com/tachacoin/tachacoinbook-mytoken-tachacoinjs-cli).

> This example uses async/await (supported natively by Node 8+).

# Running Tests

```
docker run -it --rm \
  --name tachacoinjs \
  -v `pwd`:/dapp \
  -p 45551:45551 \
  hayeah/tachacoinportal
```

Configure TACHACOIN_RPC for deployment tool:

Enter into container:

```
docker exec -it tachacoinjs sh
```

Generate initial blocks:

```
qcli importprivkey cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk
qcli generatetoaddress 600 TF4HfDn3GVEceES5GEe6mavvyVuyW1nqrr

qcli getbalance

2000000.00000000
```

Deploy test contracts:

```
export TACHACOIN_RPC=http://tachacoin:test@localhost:45551
export TACHACOIN_SENDER=TF4HfDn3GVEceES5GEe6mavvyVuyW1nqrr

sh deploy-test-contracts.sh
```

Build and run tests:

```
npm build
npm run test
```
