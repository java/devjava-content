---
id: api.security.intro
title: Introduction to Java Encryption/Decryption
slug: learn/security/intro
slug_history:
- security/introduction
type: tutorial-group
group: security
category: beginner
category_order: 1
layout: learn/tutorial.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Cryptography {intro}
- Cryptography Standards in the JDK {cryptography-standards}
- Basic Encryption/Decryption in Java {encryption-decryption}
- Useful Links {links}
description: "Learn how JCA supports working with cryptography in Java and how you can implement basic encryption/decryption mechanisms using Java Security API."
last_update: 2023-02-10
---


<a id="intro">&nbsp;</a>
## Introducing Cryptography

Cryptography is **a method of protecting data and communications using codes and digital keys** to ensure that the information is delivered untampered to the intended sender for further processing.

Understanding the core ideas of cryptography, such as encryption and decryption, is critical for a developer as you could find yourself working on features related to:

*	**Digital Signatures**: A digital signature is a cryptographic means through which one can verify a document's origin, the sender's identity, the time, and date a document was signed or sent, etc. Digital signatures work as an encrypted authentication stamp on the information.
*	**Electronic Transactions**: Using encryption in electronic money systems can protect conventional transaction data like account details and transaction amounts. Digital signatures can replace handwritten signatures or credit-card authorizations, and public-key encryption can provide confidentiality.
*	**Encryption/Decryption** in email systems.
*	**Time Stamping** to certify that a specific electronic document existed or was delivered at a certain time. Electronic handling contracts or archives with highly sensitive information are valid real-world examples.

As cryptography operates with data, this can be either in **plaintext** (*cleartext*) or **ciphertext** (*cryptogram*). Plaintext data means that the message is in natural format, readable to an attacker. Ciphertext data means that the message is in an unreadable format to the attacker but readable to the intended recipient.

You can convert the message from plaintext to ciphertext using the process of **encryption**. Similarly, you can convert ciphertext into plaintext via **decryption** by using a cryptographic algorithm and key used to make the original message. Usually, encryption or decryption processes are based on algorithms publicly available, but the control to the data is obtained using a secured **key**.

You can use a **hash** function to map an arbitrary sized set of bytes into a finite size of a relatively unique set of bytes. A well-engineered cryptographic hash function should use **salt**, a string of random (or pseudo-random) bits concatenated with a key or password. You can increase security by introducing an additional cryptographic variance using an **initialization vector (IV)** for encryption of plaintext BLOCK sequence.

> **_NOTE:_**  The code snippets presented in this article are meant to  illustrate how Java API's work at a high level. In the interest of clarity, they are sometimes simplified. Security can be a complex topic and always unique to your specific needs, so you should always consult
with your security experts about your specific requirements.
<a id="cryptography-standards">&nbsp;</a>
## Available Cryptography Standards in the JDK

Java cryptography is based on standards that are well-defined [international standards](doc:security-standard-names) that allow various platforms to operate. Among those standards are:
*	TLS (Transport Layer Security) v1.2, v1.3 – [RFC 5246](doc:rfc-5246), [RFC 8446](doc:rfc-8446)
*	RSA Cryptography Specifications PKCS #1 – [RFC 8017](doc:rfc-8017)
*	Cryptographic Token Interface Standard (PKCS#11)
*	The ECDSA signature algorithms as defined in [ANSI X9.62](doc:ANSI-20X9.62), etc.

The security landscape evolves continuously, for example stronger algorithms are introduced while older ones are deemed less secure. The Oracle JDK is updated regularly to cope with those changes and keep the Java platform secure. The [Oracle JDK Cryptographic Roadmap](doc:jre-jdk-cryptoroadmap) reflects the latest and upcoming changes applied to the security providers shipped by Oracle in the Oracle JDK.

The [Java Cryptography Architecture (JCA)](doc:jca-reference-guide) is the framework for working with cryptography using the Java programming language and is part of the Java Security API. Its goals are to offer cryptography algorithm independence and extensibility, interoperability, and an implementation agnostic from security providers.

The JCA encompasses engine classes that interact with a specific type of cryptographic service via:
*	cryptographic operations like encryption, digital signatures, message digests, etc.
*	keys and algorithm parameters
*	keystores or certificates that encapsulate the cryptographic data and can be used at higher layers of abstraction.

The JDK contains the actual cryptographic implementations for a series of providers, such as `Sun`, `SunRSASign`, `SunJCE`, etc.  To use the JCA, an application requests a particular type of object (such as a [MessageDigest](javadoc:MessageDigest)) and a particular algorithm or service (such as the `SHA-256` algorithm) and gets an implementation from one of the installed providers. Or you can request the objects from a specific provider (such as `ProviderC` from below picture).

[![Request objects for `ProviderC`: `provider.MessageDigest.getInstance("SHA-256", "ProviderC")`](/assets/images/security/java_security_overview.png)](/assets/images/security/java_security_overview.png)

*Figure 1: Request objects for ProviderC `provider.MessageDigest.getInstance("SHA-256", "ProviderC")`*

Source: [Java Security Overview](doc:java-security-overview)

If you would like to obtain the list of installed providers simply call [`java.security.Security.getProviders()`](javadoc:Security.getProviders()).  You can copy the below code snippet in [Jshell](/learn/jshell-tool/) to print the list of available cryptographic algorithms for each provider found in the JDK:


```shell
jshell> 
   ...> import java.security.Security;
   ...> import java.util.Set;
   ...> import java.util.TreeSet;
   ...> 
   ...> Set<String> algos = new TreeSet<>();
   ...> for (Provider provider : Security.getProviders()){
   ...>     Set <Provider.Service> service = provider.getServices();
   ...>     service.stream().map(Provider.Service::getAlgorithm).forEach(algos::add);
   ...> }
   ...> algos.forEach(System.out::println);
   ...> 
algos ==> []
1.2.840.113554.1.2.2
1.3.6.1.5.5.2
AES
AES/GCM/NoPadding
AES/KW/NoPadding
AES/KW/PKCS5Padding
AES/KWP/NoPadding
AES_128/OFB/NoPadding
AES_192/CBC/NoPadding
// list was truncated for display purposes
```
Some popular provider examples include: `SunPKCS11`, `SunMSCAPI (Windows)`, `BouncyCastle`, `RSA JSAFE`, `SafeNet`. If the provider you would like to use is not among the list printed, you can also register it following the steps below:

1.	Place provider classes on `CLASSPATH`.
2.	Register the provider either:
      * Statically by modifying the *conf/security/java.security* configuration file, e.g. `security.provider.5=SunJCEII`. Be aware that in JDK 8 the `java.security` file is in *java.home/lib/security/java.security*.
      *	Dynamically by invoking [`Security.addProvider(java.security.Provider)`](javadoc:Security.addProvider(java.security.Provider)) and [`Security.insertProviderAt(java.security.Provider,int)`](javadoc:Security.insertProviderAt).
3.	The preference order for a provider is declared via simple number ordering.

Now let’s inspect more in detail how to use encryption/decryption in Java.
<a id="encryption-decryption">&nbsp;</a>
## Basic Encryption/Decryption in Java

When working with data encryption, you can use this security control mechanism to protect three types of data states:
*	**Data at rest** is information not actively moving between devices or networks, stored in a database, or kept on a disk.
*	**Data in motion** represents information traveling from one network point to another.
*	**Data in use** refers to information loaded in memory actively accessed and processed by users.

Encryption is important for all three data states to offer an extra layer of protection against attacks. There are two methods of encryption: symmetric and asymmetric encryption.

### Implementing Basic Symmetric Encryption/Decryption

Symmetric or shared key encryption is a method where both parties share a key, kept secret by both parties. For example, sender `A` can encrypt a message with a shared key, then receiver `B` can decrypt the encrypted message only with that key.

[![Symmetric encryption](/assets/images/security/symmetric_encryption.png)](/assets/images/security/symmetric_encryption.png)
*Figure 2: Symmetric encryption*

To implement symmetric encryption with Java you first need to generate a shared key. You can do that using the following snippet:

```java
public static SecretKey generateKey() throws NoSuchAlgorithmException {
    KeyGenerator keygenerator = KeyGenerator.getInstance("AES"); 
    keygenerator.init(128);
    return keygenerator.generateKey();
}
```
In the previous example, you start by instantiating a secret key generator that uses the `AES` algorithm. Next, you initialize the secret key generator for 128 bits key size and requiring random bytes. 
Starting with JDK 19 the default size for `AES` algorithm has been increased from 128 bits to 256 bits (if permitted by crypto policy), otherwise the default falls back to 128 bits.
And finally generate a secret key.

To enhance the encryption/decryption mechanism you can initialize a vector (IV) with an arbitrary value:

```java
public static IvParameterSpec generateIv() {
    byte[] initializationVector = new byte[16];
    SecureRandom secureRandom = new SecureRandom();
    secureRandom.nextBytes(initializationVector);
    return new IvParameterSpec(initializationVector);
}
```
As symmetric encryption transforms a fixed-length block of plaintext data into a block of ciphertext, it can use several modes in Block cipher:
*	`ECB (Electronic Code Book Mode)`
*	`CBC (Cipher Block Chain Mode)`
*	`CCM (Counter/CBC Mode)`
*	`CFB (Cipher Feedback Mode)`
*	`OFB/OFBx (Output Feedback)`
*	`CTR (Counter mode)`
*	`GCM (Galois/Counter Mode)`
*	`KW (Key Wrap Mode)`
*	`KWP (Key Wrap Padding Mode)`
*	`PCBC (Propagating Cipher Block Chaining)`

You can check all the modes and supported transformations in the [Cipher Section](doc:java-security-cipher-algorithms) of the `Java Security Standard Algorithm Names Specification`. Next, you need to specify the Block cipher in the encryption method, when getting an instance of `Cipher` class:
```java
public static byte[] encrypt(String input, SecretKey key, IvParameterSpec iv)
        throws Exception {
    Cipher cipher = Cipher.getInstance("AES/CFB8/NoPadding");
    cipher.init(Cipher.ENCRYPT_MODE, key, iv);
    return cipher.doFinal(input.getBytes(StandardCharsets.UTF_8));
}
```

To convert the ciphertext back to the original plaintext, you should use the same Block cipher, key and IV:

```java
public static String decrypt(byte[] cipherText, SecretKey key, IvParameterSpec iv) throws Exception {
    Cipher cipher = Cipher.getInstance("AES/CFB8/NoPadding");
    cipher.init(Cipher.DECRYPT_MODE, key, iv); 
    byte[] plainText = cipher.doFinal(cipherText);
    return new String(plainText);
}
```
The [`doFinal()`](javadoc:Cipher.doFinal()) method invoked on cipher encrypts or decrypts data in a single-part operation, or finishes a multiple-part operation and returns a byte array.
So let’s put these methods together to encrypt and decrypt a message:

```java
public static void main(String[] args) throws Exception {
    SecretKey symmetricKey = generateKey();
    IvParameterSpec iv = generateIv();

    // Takes input from the keyboard
    Scanner message = new Scanner(System.in); 
    String plainText = message.nextLine();
    message.close();

    // Encrypt the message using the symmetric key
    byte[] cipherText = encrypt(plainText, symmetricKey, iv);

    System.out.println("The encrypted message is: " + cipherText);

    // Decrypt the encrypted message
    String decryptedText = decrypt(cipherText, symmetricKey, iv);

    System.out.println( "Your original message is: " + decryptedText);
}
```
Symmetric encryption is a valid option if you need an inexpensive computational encryption method as it requires the creation of a short single key (40-512 bits) available to both the sender and receiver. If you are looking for an option that uses different, lengthier keys for encryption and decryption, then read on about asymmetric encryption and decryption.

### Implementing Basic Asymmetric Encryption/Decryption

Asymmetrical encryption uses a pair of mathematical related keys, one for encryption and the other for decryption. In the example bellow `Key1` is used for encryption and `Key2` is used for decryption.

[![Asymmetric encryption](/assets/images/security/asymmetric_encryption.png)](/assets/images/security/asymmetric_encryption.png)
*Figure 3: Asymmetric encryption*

In such a system, `A` can encrypt a message using the receiver’s `B` public key, but only the private key owned by `B` can decode the message. In a pair of keys, the public key is visible to all. The private key is the secret key and is primarily used for decryption or for encryption with digital signatures.

To implement asymmetric encryption in Java you first need to generate a keypair (public, private) by getting an instance of [`KeyPairGenerator`](javadoc:KeyPairGenerator) (for the  RSA algorithm in this case). Given the algorithm selected, the [`KeyPairGenerator`](javadoc:KeyPairGenerator) object uses a 3072-bit key size and a random number initialized via the [`SecureRandom`](javadoc:KeyPairGenerator) class:

```java
public static KeyPair generateRSAKKeyPair() throws Exception {
    KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
    keyPairGenerator.initialize(3072);
    return keyPairGenerator.generateKeyPair();
}
```

If you are using JDK 19 or later, you should be aware that the `RSA`, `RSASSA-PSS`, and `DH` algorithms have a default key size increased from 2048 bits to 3072 bits. 
Next, let’s implement the encrypt method that converts the plaintext into ciphertext using a public key:

```java
public static byte[] encrypt(String plainText, PublicKey publicKey) throws Exception {
    Cipher cipher = Cipher.getInstance("RSA");
    cipher.init(Cipher.ENCRYPT_MODE, publicKey);
    return cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
}
```
To convert the ciphertext back to the original plaintext, you can use the private key:

```java
public static String decrypt(byte[] cipherText, PrivateKey privateKey) throws Exception {
    Cipher cipher = Cipher.getInstance("RSA");
    cipher.init(Cipher.DECRYPT_MODE, privateKey);
    byte[] result = cipher.doFinal(cipherText);
    return new String(result);
}
```
Using the previous methods, you can write a small program to simulate how asymmetrical encryption and decryption works:

```java
public static void main(String[] args) throws Exception {
    KeyPair keypair = generateRSAKKeyPair();

    // takes input from the keyboard
    Scanner message = new Scanner(System.in);
    System.out.print("Enter the message you want to encrypt using RSA: ");  
    String plainText = message.nextLine();
    message.close();

    byte[] cipherText = encrypt(plainText, keypair.getPublic());

    System.out.print("The encrypted text is: ");

    System.out.println(HexFormat.of().formatHex(cipherText));

    String decryptedText = decrypt(cipherText, keypair..getPrivate());

    System.out.println("The decrypted text is: " + decryptedText);
}
```

You can ensure both the sender and the integrity of the message transmitted over an insecure channel by hashing the message using [`MessageDigest`](javadoc:MessageDigest). To implement this, you should create the digest of the message and encrypt it with the private key:

```java
public static byte[] generateDigitalSignature(byte[] plainText, PrivateKey privateKey) throws Exception   {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    byte[] messageHash = md.digest(plainText);

    Cipher cipher = Cipher.getInstance("RSA");
    cipher.init(Cipher.ENCRYPT_MODE, privateKey);
    return cipher.doFinal(messageHash);
}
```
This digest is called a digital signature that can be decrypted only by the receiver who has the sender’s public key. To validate the authenticity of the message and sender you should use the public key:

```java
public static boolean verify(byte[] plainText, byte[] digitalSignature, PublicKey publicKey) throws Exception  {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    byte[] hashedMessage = md.digest(plainText);

    Cipher cipher = Cipher.getInstance("RSA");
    cipher.init(Cipher.DECRYPT_MODE, publicKey);
    byte[] decryptedMessageHash = cipher.doFinal(digitalSignature);

    return Arrays.equals(decryptedMessageHash, hashedMessage);
}
```

Below you can find a sample call that would make use of the above methods:

```java
public static void main(String[] args) throws Exception{
	byte[] digitalSignature = generateDigitalSignature(plainText.getBytes(), keypair.getPrivate());
	System.out.println("Signature Value: " + HexFormat.of().formatHex(digitalSignature));
	System.out.println("Verification: " + verify(plainText.getBytes(), digitalSignature, keypair.getPublic()));
}
```
Congratulations, you’ve learned how JCA supports working with cryptography in Java and how you can implement basic encryption and decryption mechanisms using Java Security API.

<a id="links">&nbsp;</a>
## Useful Links:
*	[Oracle JDK Cryptographic Roadmap](doc:jre-jdk-cryptoroadmap)
*	[Java Security Standard Algorithm Names Specification](doc:java-security-standard-names-spec)
*	[RFC5246](doc:rfc-5246)
*	[RFC8446](doc:rfc-8446)
*	[RFC8017](doc:rfc-8017)
