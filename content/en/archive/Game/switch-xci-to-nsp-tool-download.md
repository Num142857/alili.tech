---
title: Switch XCI to NSP Tool - 4NXCI Download
keywords: 'Nintendo,Nintendo,Switch,Hack,XCI to NSP,4NXCI,Download'
# hidden: true
tags: [Game]
slug: zzabj3gn1as
date: 2020-02-02 19:02:36
---

## 4NXCI is a tool to convert XCI files to NSP

Currently only supports Windows, other systems not supported

### Github Address:
https://github.com/The-4n/4NXCI


### Download Address

https://github.com/The-4n/4NXCI/releases


## Usage Method

## GUI Tool
If not used to commands can download GUI version, file naming roughly `4nxci-v4.03_GUI.zip
`

![Figure 1](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/4a89dd91123467dc70d9633e66182469cf9c5e2d0a555bc62b0a379a3f41da8b.png)  



### Command Line Tool

```bash
.\4nxci.exe [options...] <path_to_file.xci>  
  
Options:  
-k, --keyset             Set keyset file path, default is ./keys.dat  
-h, --help               Display help information
-t, --tempdir            Set temporary folder
-o, --outdir             Set export folder
-r, --rename             Set exported nsp file's filename
--keepncaid              Keep current ncas ID 
```

## About keyset File
Copy the following code into a txt file, then rename to `keys.dat` 
Use GUI or command line tool to import

```
master_key_00 = C2CAAFF089B9AED55694876055271C7D
master_key_01 = 54E1B8E999C2FD16CD07B66109ACAAA6
master_key_02 = 4F6B10D33072AF2F250562BFF06B6DA3
master_key_03 = 84E04EC20B9373818C540829CF147F3D
master_key_04 = CFA2176790A53FF74974BFF2AF180921
master_key_05 = C1DBEDCEBF0DD6956079E506CFA1AF6E
master_key_06 = 0AA90E6330CDC12D819B3254D11A4E1E
header_key = AEAAB1CA08ADF9BEF12991F369E3C567D6881E4E4A6A47A51F6E4877062D542D
aes_kek_generation_source = 4D870986C45D20722FBA1053DA92E8A9
aes_key_generation_source = 89615EE05C31B6805FE58F3DA24F7AA8
key_area_key_application_source = 7F59971E629F36A13098066F2144C30D
key_area_key_ocean_source = 327D36085AD1758DAB4E6FBAA555D882
key_area_key_system_source = 8745F1BBA6BE79647D048BA67B5FDA4A
titlekek_source = 1EDC7B3B60E6B4D878B81715985E629B
aes_kek_generation_source = 4d870986c45d20722fba1053da92e8a9
aes_key_generation_source = 89615ee05c31b6805fe58f3da24f7aa8
bis_kek_source = 34c1a0c48258f8b4fa9e5e6adafc7e4f
eticket_rsa_kek = 19c8b441d318802bad63a5beda283a84
eticket_rsa_kek_source = dba451124ca0a9836814f5ed95e3125b
eticket_rsa_kekek_source = 466e57b74a447f02f321cde58f2f5535
header_kek_source = 1f12913a4acbf00d4cde3af6d523882a
header_key = aeaab1ca08adf9bef12991f369e3c567d6881e4e4a6a47a51f6e4877062d542d
header_key_source = 5a3ed84fdec0d82631f7e25d197bf5d01c9b7bfaf628183d71f64d73f150b9d2
key_area_key_application_00 = ef979e289a132c23d39c4ec5a0bba969
key_area_key_application_01 = cdedbab97b69729073dfb2440bff2c13
key_area_key_application_02 = 75716ed3b524a01dfe21456ce26c7270
key_area_key_application_03 = f428306544cf5707c25eaa8bc0583fd1
key_area_key_application_04 = 798844ec099eb6a04b26c7c728a35a4d
key_area_key_application_05 = a57c6eecc5410ada22712eb3ccbf45f1
key_area_key_application_06 = 2a60f6c4275df1770651d5891b8e73ec
key_area_key_application_07 = 32221bd6ed19b938bec06b9d36ed9e51
key_area_key_application_08 = fb20aa9e3dbf67350e86479eb431a0b3
key_area_key_application_09 = ce8d5fa79e220d5f48470e9f21be018b
key_area_key_application_source = 7f59971e629f36a13098066f2144c30d
key_area_key_ocean_00 = b33813e4c9c4399c75fabc673ab4947b
key_area_key_ocean_01 = c54166efa8c9c0f6511fa8b580191677
key_area_key_ocean_02 = 3061ce73461e0b0409d6a33da85843c8
key_area_key_ocean_03 = 06f170025a64921c849df168e74d37f2
key_area_key_ocean_04 = dc857fd6dc1c6213076ec7b902ec5bb6
key_area_key_ocean_05 = 131d76b70bd8a60036d8218c15cb610f
key_area_key_ocean_06 = 17d565492ba819b0c19bed1b4297b659
key_area_key_ocean_07 = 37255186f7678324bf2b2d773ea2c412
key_area_key_ocean_08 = 4115c119b7bd8522ad63c831b6c816a6
key_area_key_ocean_09 = 792bfc652870cca7491d1685384be147
key_area_key_ocean_source = 327d36085ad1758dab4e6fbaa555d882
key_area_key_system_00 = 6dd02aa15b440d6231236b6677de86bc
key_area_key_system_01 = 4ab155e7f29a292037fd147592770b12
key_area_key_system_02 = b7a74adeaf89c2a198c327bdff322d7d
key_area_key_system_03 = d5aab1acd23a8aec284a316df859d377
key_area_key_system_04 = 9b44b45b37de9d14754b1d22c2ca742c
key_area_key_system_05 = 0012e957530d3dc7af34fbbe6fd44559
key_area_key_system_06 = 01744e3b0818445cd54ee9f89da43192
key_area_key_system_07 = d0d30e46f5695b875f11522c375c5a80
key_area_key_system_08 = bd06cb1b86bd5c433667470a09eb63de
key_area_key_system_09 = e19f788f658eda8bbf34a1dd2a9503a9
key_area_key_system_source = 8745f1bba6be79647d048ba67b5fda4a
```

