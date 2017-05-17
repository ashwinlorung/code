package com.wordFrequencyCount;


public class Word {

	private String str_word;
	private int int_count;
	
	public Word(String word, int count) {
		str_word = word;
		int_count = count;
	}
	
	public void setCount(int count) {
		int_count = count;
	}
	public String getWord() {
		return str_word;
	}
	
	public int getCount() {
		return int_count;
	}
}
