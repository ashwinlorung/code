package com.wordFrequencyCount;

import java.io.BufferedReader; 
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;

public class WordFrequencyCounter {
	
	public static void main(String[] args) throws Exception{
		
		WordsList WordsList_obj = new WordsList();
		Reader reader_file = null;
		BufferedReader reader_sys = new BufferedReader(new InputStreamReader(System.in));
		
		System.out.println("Enter the name of the file containing the words = ");
		String str_file_name = reader_sys.readLine();
		
		reader_file = new BufferedReader(
				new InputStreamReader(
						new FileInputStream(str_file_name),"UTF-8"
				)
		);
		
		char char_ch;
		int int_ch;
		StringBuilder word = new StringBuilder();
		while ((int_ch=reader_file.read()) != -1 )
		{
			char_ch = (char) int_ch;
			if(char_ch == ' ' || char_ch == '\n' || char_ch == '\t' )
			{
				WordsList_obj.populateWordsList(word.toString());
				word.delete(0, word.length());
			}
			else
				word.append(char_ch);
		}
		reader_file.close();
		WordsList_obj.displayWordsList();
		System.out.println("Enter the name of the file where the output is to be saved = ");
		str_file_name = reader_sys.readLine();
		WordsList_obj.writeWordsList(str_file_name);
		System.out.println("Success :)");
	}
	
}
