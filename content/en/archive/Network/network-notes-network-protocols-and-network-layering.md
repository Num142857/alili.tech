---
title: Network Notes - Network Protocols and Network Layering
tags: [Network]
slug: ef96a5b6
keywords: Network,Network,Network Protocols,Network Layering
date: 2018-08-30 00:00:00
---

The Bible has a Tower of Babel story, God to prevent humans from uniting, made humans speak different languages. Humans couldn't communicate, couldn't reach "agreement", Tower of Babel plan failed.

A thousand years later, a group of engineers to solve this problem, formulated various protocols and standards, let various devices communicate through protocols, then through internet achieved world interconnection.

Like the code we write now, using universal programming languages, world is thus connected. Our computer languages are also a kind of protocol.

To make world interconnected, make computers unite, must use network protocols to make them cooperate, to complete common goals.

## Protocol Three Elements

(1) Semantics. Each segment needs to represent some meaning
(2) Syntax. Each segment conforms to certain rule formats,
(3) Timing. Each segment's task execution order.

## Network Layering

Network layering is dividing work that network nodes need to complete for data sending or forwarding, packing or unpacking, control information loading or extraction, respectively completed by different hardware and software modules.

Simply put a complete HTTP request, needs to go through multiple transmissions, during which needs different software and hardware modules to complete corresponding work.
We classify corresponding stages' different characteristics. Each network layer has corresponding protocol standards for data transmission.

Like a company, different levels of people use different communication methods to interact. Network is roughly the same.


## What Network Protocols Do We Commonly Use? 

During our network communication process, through which devices, which protocols can achieve a complete communication?

Network layers can be divided into five-layer Internet protocol stack and seven-layer Internet protocol stack

### Five-Layer Model

Internet protocol stack has five layers: Application layer, Transport layer, Network layer, Link layer and Physical layer. Different from OSI seven-layer model, this is also the layering method used in actual use. 
(1) Application layer
Supports network applications, application protocols are just one component of network applications, processes running on different hosts use application layer protocols for communication.
(2) Transport layer
Responsible for providing application process data transmission services between source and destination, this layer mainly defines two transport protocols, Transmission Control Protocol TCP and User Datagram Protocol UDP.
(3) Network layer
Responsible for independently sending datagrams from source to destination, mainly solves routing selection, congestion control and network interconnection problems.
(4) Data link layer
Responsible for encapsulating IP datagrams into frame formats suitable for physical network transmission and transmitting, or unpacking frames received from physical network, extracting IP datagrams and handing to network layer.
(5) Physical layer
Responsible for transmitting bit streams between nodes, i.e., responsible for physical transmission. This layer's protocols relate to both links and transmission media

### Five-Layer Model Corresponding Protocols

Physical layer: Ethernet · Modem · Power Line Communication (PLC) · SONET/SDH · G.709 · Optical Fiber · Coaxial Cable · Twisted Pair, etc.

Data link layer: Wi-Fi(IEEE 802.11) · WiMAX(IEEE 802.16) ·ATM · DTM · Token Ring · Ethernet ·FDDI · Frame Relay · GPRS · EVDO ·HSPA · HDLC · PPP · L2TP ·PPTP · ISDN·STP, etc.

Network layer protocols: IP (IPv4 · IPv6) · ICMP· ICMPv6·IGMP ·IS-IS · IPsec · ARP · RARP, etc.

Transport layer protocols: TCP · UDP · TLS · DCCP · SCTP · RSVP · OSPF, etc.

Application layer protocols: DHCP ·DNS · FTP · Gopher · HTTP· IMAP4 · IRC · NNTP · XMPP ·POP3 · SIP · SMTP ·SNMP · SSH ·TELNET · RPC · RTCP · RTP ·RTSP· SDP · SOAP · GTP · STUN · NTP· SSDP · BGP · RIP, etc.



### Seven-Layer Model
#### First Layer － Physical Layer

Function: Transmission medium specifications, data physical presentation and transmission specifications, connector specifications　

1. This layer includes physical networking media, such as cable connections, connectors, network cards, etc.　

2. Physical layer protocols generate and detect voltage to send and receive signals carrying data.　

3. Although physical layer doesn't provide error correction services, it can set data transmission rates and monitor data　

Example: Insert network interface card into your desktop PC, you've established computer networking foundation. In other words, you've provided a physical layer.
#### Second Layer － Data Link Layer
Function: Synchronization, error checking, MAC method formulation　

1. Its main function is to divide data received from network layer into specific frames transmittable by physical layer.　

2. Frame is a structure packet used to move data, it not only includes raw (unprocessed) data, or "payload", but also includes sender and receiver network addresses and error correction and control information. Addresses determine where frame will be sent, error correction and control information ensures frame arrives error-free.　

3. Usually, sender's data link layer will wait for acknowledgment signal from receiver that data was correctly received.　

4. Data link layer controls information flow, to allow network interface cards to correctly process data.　

5. Data link layer functions are independent of network and its nodes' adopted physical layer type.　

Note: Some connection devices, like bridges or switches, because they decode frames and use frame information to send data to correct receiver, so they work at data link layer.

#### Third Layer － Network Layer
Function: Addressing, selecting transmission paths　

1. Network layer decides best path from network node A to another network node B by comprehensively considering sending priority, network congestion level, service quality and optional route costs.　

2. In networks, "routing" guides data sending based on addressing schemes, usage patterns and reachability.　

3. Network layer protocols can also compensate for imbalances in data sending, transmission and receiving device capabilities. To complete this task, network layer segments and reassembles data packets.　

4. Segmentation and reassembly refers to process where network layer reduces data unit size when data transfers from network segment that can handle larger data units to network segment that can only handle smaller data units. Reassembly is reconstructing segmented data units.　
Note 1. Network layer segmentation refers to data frame size reduction, while network segmentation refers to dividing a network into smaller logical or physical segments.　

Note 2. Router: Because network layer handles routing, and routers because connect network segments and intelligently guide data transmission, so belong to network layer.　Note 3. In TCP/IP protocol IP belongs to network layer; In IPX/SPX protocol IPX also belongs to network layer

#### Fourth Layer － Transport Layer
Function: Sequence numbering, data flow control, error checking and error handling, ensuring data reliably, sequentially, error-free transmitted from point A to point B　

1. Because if there's no transport layer, data cannot be verified or interpreted by receiver, so transport layer is often considered the most important layer in OSI model.　

2. Transport protocols simultaneously perform flow control or specify appropriate sending rates based on how fast receiver can receive data.　

3. Transport layer forcibly segments and numbers longer data packets according to maximum size network can handle. For example: Ethernet cannot receive data packets larger than 1500 bytes. Sender node's transport layer segments data into smaller data pieces, simultaneously arranges a sequence number for each data piece, so when data arrives at receiver node's transport layer, can reassemble in correct order. This process is called sorting.　

4. In networks, transport layer sends an ACK (acknowledgment) signal to notify sender data was correctly received. If data has errors or data isn't acknowledged within given time period, transport layer will request sender to resend data.　NOTE: One service working at transport layer is TCP (Transfer Control Protocol) in TCP/IP protocol suite, another transport layer service is SPX (Serial package Exchange) in IPX/SPX protocol set

#### Fifth Layer － Session Layer
Function: Responsible for establishing and maintaining communication between two nodes in network.　

1. Session layer functions include: establishing communication links, keeping session process communication links open, synchronizing dialogue between two nodes, deciding if communication is interrupted and deciding where to resend when communication interrupted　Example: Using full-duplex mode or half-duplex mode, how to initiate transmission, how to end transmission, how to set transmission parameters　

2. Session layer sets communication deadlines by deciding node communication priority and communication duration.

#### Sixth Layer － Presentation Layer
Function: Internal code conversion, compression and decompression, encryption and decryption, acts as "translator" role between applications and network.

1. At presentation layer, data will be formatted according to schemes network can understand; this formatting also differs depending on network type used. For example, IBM hosts use EBCDIC encoding, while most PCs use ASCII code. In this case, session layer is needed to complete this conversion　

2. Presentation layer protocols also decode and encode picture and file format information.　

3. Presentation layer manages data decryption and encryption, like system password processing. If querying your bank account on Internet, using is a secure connection. 

#### Seventh Layer － Application Layer
Function: Refers to network operating systems and specific applications, corresponding to WWW servers, FTP servers and other application software　

1. Term "application layer" doesn't refer to a particular application running on network, but provides a set of services convenient for program developers to use network functions in their applications.　

2. Services application layer provides include file transfer (FTP), file management and email information processing (SMTP), etc.


### Analogy

Like sending express delivery process (http, application layer),
You place order with SF Express (first request),
SF Express accepts order (response),
You contact mobile guy (response response)，
You put message in box (start encapsulating request, session layer)，
Courier encapsulates a layer of box, pastes express label, takes back to store (transport layer），
Check at express point if regional express (network layer），
Various express transfer centers (physical layer），
Express arrives at recipient city transfer center (physical layer），
Transfer transport vehicle (link layer），
Arrives at regional distribution (network layer），
Store delivery (transport layer），
Courier signature (session layer），
Open and check (presentation layer），
Receive express (application layer).

