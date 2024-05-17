### Project title - eWaste Recycling (B2C)


**Description**

Most people have eWaste - electronic waste - sitting in drawers at home, including old smartphones, laptops, tablets, consoles, televisions, etc.
大多数人家里的抽屉里都有电子垃圾，包括旧智能手机、笔记本电脑、平板电脑、游戏机、电视等。

There are many reasons these devices should be recycled as soon as possible, including:
应尽快回收这些设备的原因有很多，包括：

1. Their value is higher the sooner they are recycled, e.g. if sold 越早回收，它们的价值就越高，例如如果出售
2. They will be more likely to be used, and also used for longer, by their next owners 它们将更有可能被下一任主人使用，并且使用时间也更长
3. If broken, the parts they contain are more useful the sooner they are made available 如果损坏，它们所包含的部件越早可用就越有用

There are also many reasons why people ‘hang on’ to their devices, including: 人们“坚持”使用他们的设备的原因也有很多，包括：

1. They are concerned that their data might be stolen if they don’t ‘wipe’ them first, e.g.
   gaining access to their bank accounts, etc 他们担心，如果不先“擦除”数据，他们的数据可能会被盗。访问他们的银行账户等
2. Devices are seen as a backup if their current device is stolen (unlikely in reality) 如果当前设备被盗（现实中不太可能），设备将被视为备份
3. They still have data on them, e.g photos, game saves, etc. 他们仍然保存有数据，例如照片、游戏保存等。
4. They have personal memories and are kept as part of a collection 它们具有个人记忆并作为收藏的一部分保存

eWaste recycling facilities are available and also data cleansing facilities, but these often export the problem to other countries, 
e.g. see What is e-waste and what can we do about it? | Natural History Museum
电子废物回收设施和数据清理设施都是可用的，但这些设施往往将问题转移到其他国家，例如：请参阅什么是电子垃圾以及我们能做些什么？ |自然历史博物馆

This project focuses on the items above by proposing that owners can be offered a service that will retrieve data from devices 
as well as wiping them clean before they are then:
该项目重点关注上述项目，建议向所有者提供一项服务，从设备中检索数据并在数据清除之前将其清除：

1. (when possible) reused locally (reducing the carbon footprint of shipping them elsewhere) （如果可能）在当地重复使用（减少将其运送到其他地方的碳足迹）
2. broken into spare parts for use nationally or ultimately recycled ethically (i.e. without child labour, etc.) either within the UK, or local to where the recycled materials will be reused 分解成备件供全国使用或最终在英国境内或在回收材料将重复使用的地方进行道德回收（即不使用童工等）

The project aims to offer a hub where devices can be identified according to age and demand with an option for owners to pay for data retrieval. 
Where devices might be resold, e.g. newish smart phones, etc., then the hub should identify third parties where the owner might sell their device,
with a referrer fee paid by the third party for successful reselling. The seller would still be offered an option of having data retrieved and their 
device wiped (with the fee).
该项目旨在提供一个中心，可以根据年龄和需求识别设备，并允许所有者选择支付数据检索费用。设备可能被转售的地方，例如新的智能手机等，那么中心应识别所有者可能出售其设备的第三方，并由第三方为成功转售支付推荐费。卖家仍可以选择检索数据并擦除其设备（需付费）。

The Hub will be a web application with web server/database with desktop being essential (optionally a mobile web browser interface as well).
该中心将是一个带有网络服务器/数据库的网络应用程序，桌面是必不可少的（也可以选择移动网络浏览器界面）。


**Features**

The application features needed are: 所需的应用程序功能是：

- Standard account registration and login,optionally common third party accounts may
be used, e.g. Google, Microsoft, etc. You should have previous experience if you
wish to use third party authentication. 
标准账户注册和登录，也可以选择使用常见的第三方账户，例如： Google、微软等。如果您想使用第三方身份验证，您应该有相关经验。
- Admin role can upgrade accounts for staff. 
管理员角色可以升级员工的帐户。
- Accept details of devices and identify whether they are‘current’(currently popular),
‘recycle’, ‘rare’ or ‘unknown’. 
接受设备的详细信息并确定它们是否是“当前”（当前流行）、“回收”、“稀有” 或 “未知”。
- Current devices will have listings for expected value according to third parties,such
as CeX, etc. with a focus on local places to trade in by physically handing in. Owner to be given a QRCode that offers a bonus (e.g. voucher) which also identifies the
eWaste Hub for a (potential) referral fee and simplifies them handing in a device (since they will have entered data already). Data wiping is guaranteed by the third party. 
当前的设备将根据第三方（例如 CeX 等）列出预期价值，重点是通过实际交割进行交易的当地地点。所有者将获得一个提供奖金（例如代金券）的二维码，该二维码还可以识别eWaste Hub 收取
（潜在的）推荐费，并简化了他们提交设备的过程（因为他们已经输入了数据）。数据擦除由第三方保证。
- ‘Recycle’ devices are offered for recycling with data retrieval(at a fee) and data wiping (at no cost). Data retrieval devices are accepted by the eWaste Hub themselves for
retrieving data which is then hosted in the cloud and a secure link emailed to the owner for a limited time (valid for 3 months, can be retrieved from 3-6 months with a further
fee payment, then deleted). Data wiping will be handled by a third party who recycle the device. 
“回收”设备可用于回收数据，包括数据检索（收费）和数据擦除（免费）。 eWaste Hub 本身接受数据检索设备来检索数据，然后将数据托管在云中，
并在有限时间内通过电子邮件将安全链接发送给所有者（有效期为 3 个月，可在 3-6 个月内检索，但需额外付费）付款后删除）。数据擦除将由回收设备的第三方处理。
- Rare devices are handled in a similar manner to current devices but the third parties may include eBay, etc. 
稀有设备的处理方式与当前设备类似，但第三方可能包括 eBay 等。
- Unknown devices are flagged for employees to update the device database and contact the owner. 
未知设备会被标记，以便员工更新设备数据库并联系所有者。
- Expected roles will include(device)owner,admin and staff(employee). 
预期角色将包括（设备）所有者、管理员和员工（员工）。
- For staff, creation of (new) devices details. This should be initially populated from an
offered device (by an owner). Draft details should be saved (but not visible). 
对于员工，创建（新）设备详细信息。这应该最初从提供的设备（由所有者）填充。应保存草稿详细信息（但不可见）。
- Devices can be made visible or hidden, e.g. in case of incomplete/incorrect details. 
设备可以变得可见或隐藏，例如如果详细信息不完整/不正确。
  - Devices can be moved between classifications, which include
  current/recycle/rare/unwanted as well as device types, i.e. console/phone/tablet/laptop, etc. At least two device types 
  should be shown working. 
  设备可以在分类之间移动，其中包括当前/回收/稀有/不需要以及设备类型，即控制台/手机/平板电脑/笔记本电脑等。至少应显示两种设备类型正在运行。
- When a device is current, details for at least one third party should be shown, e.g. in a new/pop out window. 
当设备处于最新状态时，应显示至少一个第三方的详细信息，例如在新的/弹出的窗口中。
- Payments for data transfer should be via paypal and stripe (sandbox only).
数据传输付款应通过 paypal 和 stripe（仅限沙盒）进行。
- An Admin dashboard will need to be available for managing users accounts. 
需要有一个管理仪表板来管理用户帐户。
- Relevant reports should be available for staff, e.g. payments for data wiping, device
processing (e.g. received, transferring, wiping, dispatch to this party), QR Code generation by third party, referral fees.
应向工作人员提供相关报告，例如数据擦除、设备处理（例如接收、传输、擦除、发送给该方）、第三方生成二维码、推荐费的付款。

**Application users**

Individual owners (i.e. Members of Public) who own eWaste and have concerns over loss/theft of data as well as wishing to ethically recycle their devices.
拥有电子废物并担心数据丢失/被盗并希望合乎道德地回收其设备的个人所有者（即公众）。

**Out of scope**

Selling devices, offering an eWaste service to Businesses.
销售设备，向企业提供电子垃圾服务。

