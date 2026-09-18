package com.clinic.management.common.response;

public class ApiResponse<T> {
	private boolean success;
	private String message;
	private T data;

	public ApiResponse(boolean success, String message, T data){
		this.success=success;
		this.message=message;
		this.data=data;
	}

	public boolean isSuccess(){
		return this.success;
	}

	public String getMessage(){
		return this.message;
	}

	public T getData(){
		return this.data;
	}
}
