const { assert } = require("chai");

const FileHash = artifacts.require("./FileHash.sol");

require("chai").use(require("chai-as-promised")).should();

//accounts : 계약 이름? 계정?
contract("FileHash", (accounts) => {
  //테스트 코드 작성
  let img;

  before(async () => {
    img = await FileHash.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = img.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      console.log(address);
    });
  });

  describe("storage", async () => {
    it("updates the imgHash", async () => {
      let imgHash;
      imgHash = "abc123";
      await img.set(imgHash);
      const result = await img.get();
      assert.equal(result, imgHash);
    });
  });
});
