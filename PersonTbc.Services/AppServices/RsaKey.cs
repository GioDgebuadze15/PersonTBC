﻿using System.Security.Cryptography;

namespace PersonTbc.Services.AppServices;

public static class RsaKey
{
    public static RSA GetRsaKey()
    {
        var rsaKey = RSA.Create();
        rsaKey.ImportRSAPrivateKey(File.ReadAllBytes("key"), out _);
        return rsaKey;
    }
}