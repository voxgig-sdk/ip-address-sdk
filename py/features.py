# IpAddress SDK feature factory

from feature.base_feature import IpAddressBaseFeature
from feature.test_feature import IpAddressTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IpAddressBaseFeature(),
        "test": lambda: IpAddressTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
