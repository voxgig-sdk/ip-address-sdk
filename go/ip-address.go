package voxgigipaddresssdk

import (
	"github.com/voxgig-sdk/ip-address-sdk/go/core"
	"github.com/voxgig-sdk/ip-address-sdk/go/entity"
	"github.com/voxgig-sdk/ip-address-sdk/go/feature"
	_ "github.com/voxgig-sdk/ip-address-sdk/go/utility"
)

// Type aliases preserve external API.
type IpAddressSDK = core.IpAddressSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IpAddressEntity = core.IpAddressEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IpAddressError = core.IpAddressError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBulkQueryIPEntityFunc = func(client *core.IpAddressSDK, entopts map[string]any) core.IpAddressEntity {
		return entity.NewBulkQueryIPEntity(client, entopts)
	}
	core.NewGetCurrentIpEntityFunc = func(client *core.IpAddressSDK, entopts map[string]any) core.IpAddressEntity {
		return entity.NewGetCurrentIpEntity(client, entopts)
	}
	core.NewGetIpIntelligenceEntityFunc = func(client *core.IpAddressSDK, entopts map[string]any) core.IpAddressEntity {
		return entity.NewGetIpIntelligenceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIpAddressSDK = core.NewIpAddressSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
