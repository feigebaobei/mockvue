export default {
  keyStore: {"privatekey":"01837f014db7fc5acd914f53839bdb5dbf4cd80ecbbb7bf966ba9619f34b627a"},
  udid: '',
  adid: '',
  fdid: '',
  // pvData: { // udid的pvdata demo
  //   did: "did:ttm:u012345678a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74",
  //   superDid："did:ttm:u012345695a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74",
  //   phone: "18512345678",
  //   relationDid: [
  //     "did:ttm:a012340b95a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74",
  //     "did:ttm:a012345678a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74"
  //   ],
  //   subDid: {
  //     type: "a",
  //     did: "did:ttm:a012340b95a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74",
  //     idpwd: "123456",
  //     relationDid: "did:ttm:f012340b95a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74",
  //   },
  //   version: "1588985429",

  //   property: {
  //     name: "qwer",
  //     avatar: "URL"
  //   },
  //   idCeritfies: [
  //     {
  //       claim_sn: "12341234965eb72c92a549dd5a330112",
  //       certifyCategoryId: "1234qwertyuio",
  //       data: {
  //         name: "qwer",
  //         gender: "男"
  //       }
  //     }
  //   ],
  //   commonCertifies: [
  //     {
  //       claim_sn: "12345678965eb72c92a549dd5a330112",
  //       certifyCategoryId: "1234qwertyuio",
  //       data: {
  //         name: "qwer",
  //         gender: "男",
  //         birthday: "1588985429",
  //         school: "天津大学",
  //         major: "建筑系",
  //         grade: "5",
  //         serialNumber: "12345678"
  //       }
  //     }
  //   ],
  //   contacts: [],
  //   checkSignCertifies: ["12341234965eb72c92a549dd5a330112"],
  // }
  pvData: {
    "did": "did:ttm:u043829681e922731094502ebffdf1f10389c3ad11c8a67847c68f0482e608",
    "phone": "15652684614",
    "subDids": [{
      "did": "did:ttm:f08ae17a9f890e251f51d161c3d7e064a742714522c8a67847c68f0482a796",
      "idpwd": "111111",
      "relationDid": "did:ttm:a0_app_001_did",
      "type": "f"
    }],
    "version": "1588985429",
    "property": {
      "nickName": "hello",
      "avatar": "URL"
    },
    "submitCertifies": [{
      "id": "a68c5fd6d964575b3d42bf959",
      "type": "validated",
      "templateId": "t001",
      "templateTitle": "荣誉证书",
      "content": {
        "name": "abc",
        "age": "18"
      }
    }],
    "contacts": [],
    "validatedCertifies": [{
      "id": "a68c5fd6d964575b3d42bf959",
      "type": "validated",
      "templateId": "t001",
      "templateTitle": "荣誉证书",
      "content": {
        "name": "abc",
        "age": "18"
      }
    }]
  }
}

// 庆雪给的数据
// 可以使用sm2.js解密
// qwertyui23456789
// 私钥:
// 0x5090ffff751b0e1d2b6170d66b2e47a4fe74e91e15f3dfd5e6840361e1f7fca4
// 公钥:
// 0x04fb68350be52f9f9277ee8950936c8fcadc8bfbcb9ff6b98900d236874ab6970ad933d4ec6c843534542f3877ee33f4eae963f29769f0f05a1d4526106e869907
// sm2 公钥加密:
// 0xf6d10d352134f2fb70506bee3f552d9d2d30a2f43f79effd15365b57351c85d857545b93c0eddd53bc779ca19dd276bd20a683043e3f5ec18cd6221490602eaae99784e69a7c0f6ed7caf13cbd1dbb7c64a4e8db13d65f4d399e39a8236b5be326499eba5cf4ef419060037436290bb0

// {'privatekey':'01837f014db7fc5acd914f53839bdb5dbf4cd80ecbbb7bf966ba9619f34b627a'}