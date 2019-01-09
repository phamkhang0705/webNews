using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;

namespace webNews.Shared
{
    public static class CryptUtils
    {

        public static string HashString(string stringToHash, HashAlgorithm algo)
        {

            byte[] bytes = Encoding.UTF8.GetBytes(stringToHash);

            bytes = algo.ComputeHash(bytes);
            return Convert.ToBase64String(bytes);
        }

        public static string GetMD5Hash(string text)
        {

            MD5CryptoServiceProvider hashAlgorithm = new MD5CryptoServiceProvider();

            byte[] bytes = Encoding.UTF8.GetBytes(text);

            bytes = hashAlgorithm.ComputeHash(bytes);

            return ByteArrayToHexString(bytes);
        }

        private static string ByteArrayToHexString(byte[] Bytes)
        {
            StringBuilder Result = new StringBuilder();
            string HexAlphabet = "0123456789ABCDEF";

            foreach (byte B in Bytes)
            {
                Result.Append(HexAlphabet[(int)(B >> 4)]);
                Result.Append(HexAlphabet[(int)(B & 0xF)]);
            }
            return Result.ToString();
        }

        public static string HashSHA256(string value)
        {

            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));
                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }
            return Sb.ToString();

        }


        public static string RamdonStringForSalt()
        {
            var random = new RNGCryptoServiceProvider();
            int max_length = 32;
            byte[] salt = new byte[max_length];
            random.GetNonZeroBytes(salt);
            return Convert.ToBase64String(salt);
        }

        public static AsymmetricCipherKeyPair GetPrivateKey(string privateKey)
        {
            StreamReader sr = null;
            try
            {
                sr = new StreamReader(privateKey);
                Org.BouncyCastle.OpenSsl.PemReader pr = new Org.BouncyCastle.OpenSsl.PemReader(sr);
                AsymmetricCipherKeyPair keyPair = (AsymmetricCipherKeyPair)pr.ReadObject();

                return keyPair;
            }
            catch
            {
                // ignored
            }
            finally
            {
                try
                {
                    sr.Close();
                }
                catch
                {
                    // ignored
                }
            }
            return null;
        }

        public static AsymmetricKeyParameter GetPublicKey(string publicKey)
        {
            StreamReader sr = null;
            try
            {
                sr = new StreamReader(publicKey);
                Org.BouncyCastle.OpenSsl.PemReader pr = new Org.BouncyCastle.OpenSsl.PemReader(sr);
                AsymmetricKeyParameter KeyPair = (AsymmetricKeyParameter)pr.ReadObject();
                return KeyPair;
            }
            catch
            {

            }
            finally
            {
                try
                {
                    sr.Close();
                }
                catch
                {

                }
            }
            return null;
        }



        public static string Decrypt2(string privateKeyFileName, string encryptString)
        {
            try
            {
                AsymmetricCipherKeyPair keyPair = GetPrivateKey(privateKeyFileName);

                AsymmetricKeyParameter privateKey = keyPair.Private;

                // Creating the RSA algorithm object
                IAsymmetricBlockCipher cipher = new RsaEngine();
                Console.WriteLine("privateKey: " + privateKey);

                // Initializing the RSA object for Decryption with RSA private key. Remember, for decryption, private key is needed
                //cipher.Init(false, KeyPair.Private);            
                cipher.Init(false, keyPair.Private);


                byte[] encryptByte = Convert.FromBase64String(encryptString);

                //Encrypting the input bytes
                //byte[] cipheredBytes = cipher.ProcessBlock(inputBytes, 0, inputMessage.Length);
                byte[] cipheredBytes = cipher.ProcessBlock(encryptByte, 0, encryptByte.Length);

                //Write the encrypted message to file
                // Write encrypted text to file
                String decryptString = System.Text.Encoding.UTF8.GetString(cipheredBytes);
                return decryptString;
            }
            catch (Exception ex)
            {
                // Any errors? Show them            
                Console.WriteLine("Exception decrypt " + ex.Message);
            }
            finally
            {

            }
            return string.Empty;
        }


        public static string Encrypt2(string publicKeyFileName, string inputMessage)
        {


            //AsymmetricCipherKeyPair keyPair = GetPublicKey("");
            AsymmetricKeyParameter keyPair = GetPublicKey(publicKeyFileName);
            UTF8Encoding utf8enc = new UTF8Encoding();

            try
            {
                // Converting the string message to byte array
                byte[] inputBytes = utf8enc.GetBytes(inputMessage);

                AsymmetricKeyParameter publicKey = keyPair;//ReadAsymmetricKeyParameter(publicKeyFileName);

                // Creating the RSA algorithm object
                IAsymmetricBlockCipher cipher = new RsaEngine();

                // Initializing the RSA object for Encryption with RSA public key. Remember, for encryption, public key is needed
                cipher.Init(true, publicKey);

                //Encrypting the input bytes
                byte[] cipheredBytes = cipher.ProcessBlock(inputBytes, 0, inputMessage.Length);

                String encrypt = Convert.ToBase64String(cipheredBytes);

                return encrypt;
            }
            catch (Exception ex)
            {
                // Any errors? Show them
                throw new Exception("Encrypt string fail, detail as folowing", ex);
            }

        }

        public static string HMASHA1(string input, byte[] key)
        {
            HMACSHA1 myhmacsha1 = new HMACSHA1(key);
            byte[] byteArray = Encoding.ASCII.GetBytes(input);
            MemoryStream stream = new MemoryStream(byteArray);
            return myhmacsha1.ComputeHash(stream).Aggregate("", (s, e) => s + $"{e:x2}", s => s);
        }

        private static RsaKeyParameters MakeKey(string keyFileName, bool isPrivateKey)
        {
            //var modulus = new Org.BouncyCastle.Math.BigInteger(modulusHexString, 16);
            //var exponent = new Org.BouncyCastle.Math.BigInteger(exponentHexString, 16);

            FileStream fs = new FileStream(keyFileName, FileMode.Open);
            byte[] certBytes = new byte[fs.Length];
            fs.Read(certBytes, 0, (Int32)fs.Length);
            fs.Close();
            X509Certificate2 cert1;
            if (isPrivateKey)
            {
                cert1 = new X509Certificate2(keyFileName, "123456");
            }
            else
            {
                cert1 = new X509Certificate2();//.Import("");
                cert1.Import(certBytes);
            }
            if (isPrivateKey)
                return DotNetUtilities.GetRsaPublicKey((RSACryptoServiceProvider)cert1.PrivateKey);
            return DotNetUtilities.GetRsaPublicKey((RSACryptoServiceProvider)cert1.PublicKey.Key);

            //return new RsaKeyParameters(isPrivateKey, modulus, exponent);
        }

        public static string Sign(string data, string keyFileName)
        {
            /* Make the key */
            RsaKeyParameters key = MakeKey(keyFileName, true);

            /* Init alg */
            ISigner sig = SignerUtilities.GetSigner("SHA1withRSA");

            /* Populate key */
            sig.Init(true, key);

            /* Get the bytes to be signed from the string */
            var bytes = Encoding.UTF8.GetBytes(data);

            /* Calc the signature */
            sig.BlockUpdate(bytes, 0, bytes.Length);
            byte[] signature = sig.GenerateSignature();

            /* Base 64 encode the sig so its 8-bit clean */
            var signedString = Convert.ToBase64String(signature);

            return signedString;
        }

        public static bool Verify(string data, string expectedSignature, string keyFileName)
        {
            /* Make the key */
            RsaKeyParameters key = MakeKey(keyFileName, false);

            /* Init alg */
            ISigner signer = SignerUtilities.GetSigner("SHA1withRSA");

            /* Populate key */
            signer.Init(false, key);

            /* Get the signature into bytes */
            var expectedSig = Convert.FromBase64String(expectedSignature);

            /* Get the bytes to be signed from the string */
            var msgBytes = Encoding.UTF8.GetBytes(data);

            /* Calculate the signature and see if it matches */
            signer.BlockUpdate(msgBytes, 0, msgBytes.Length);
            return signer.VerifySignature(expectedSig);
        }
        public static string SignRsa(string stringToSign, string keyFileName, string privatekeyPassword)
        {
            var signed = string.Empty;
            var ipCert = new X509Certificate2(keyFileName, privatekeyPassword);
            var RSA = (RSACryptoServiceProvider)ipCert.PrivateKey;
            var encoder = new ASCIIEncoding();
            var binData = encoder.GetBytes(stringToSign);
            byte[] binSignature;
            using (var sha1 = new SHA1CryptoServiceProvider())
                binSignature = RSA.SignData(binData, sha1);
            //if (RSA.VerifyData(binData, new SHA1CryptoServiceProvider(), binSignature))
            //{
            signed = Convert.ToBase64String(binSignature);
            //}                
            return signed;
        }

        public static bool VerifyRsa(string data, string expectedSignature, string keyFileName)
        {
            var ipCert = new X509Certificate2(keyFileName);
            var RSA = (RSACryptoServiceProvider)ipCert.PublicKey.Key;
            var encoder = new ASCIIEncoding();
            var binData = encoder.GetBytes(data);
            byte[] binSignature = Convert.FromBase64String(expectedSignature);
            return RSA.VerifyData(binData, new SHA1CryptoServiceProvider(), binSignature);
        }
    }
}