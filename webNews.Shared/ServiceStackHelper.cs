﻿using System;
using ServiceStack;

namespace webNews.Shared
{
    public static class ServiceStackHelper
    {
        static ServiceStackHelper()
        {
            PclExport.Instance = new MyNet40PclExport();
            Licensing.RegisterLicense(string.Empty);
        }

        public static void Help()
        {

        }

        private class MyNet40PclExport : Net40PclExport
        {
            public override LicenseKey VerifyLicenseKeyText(string licenseKeyText)
            {
                return new LicenseKey { Expiry = DateTime.MaxValue, Hash = string.Empty, Name = "n3t3h", Ref = "1", Type = LicenseType.Enterprise };
            }
        }
    }
}