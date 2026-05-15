package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBulkQueryIPEntityFunc func(client *IpAddressSDK, entopts map[string]any) IpAddressEntity

var NewGetCurrentIpEntityFunc func(client *IpAddressSDK, entopts map[string]any) IpAddressEntity

var NewGetIpIntelligenceEntityFunc func(client *IpAddressSDK, entopts map[string]any) IpAddressEntity

