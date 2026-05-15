# ProjectName SDK exists test

import pytest
from ipaddress_sdk import IpAddressSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IpAddressSDK.test(None, None)
        assert testsdk is not None
