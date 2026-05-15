package core

type IpAddressError struct {
	IsIpAddressError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIpAddressError(code string, msg string, ctx *Context) *IpAddressError {
	return &IpAddressError{
		IsIpAddressError: true,
		Sdk:              "IpAddress",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IpAddressError) Error() string {
	return e.Msg
}
