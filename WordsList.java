package com.wordFrequencyCount;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Map;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.io.Writer;

public class WordsList {

	private ArrayList <Word>list_words;
	private Map <Integer,ArrayList<Word>> map_list_words;
	private ArrayList<Word> list_words_sort;
		
	public WordsList() {
		
		map_list_words = new HashMap<Integer, ArrayList<Word>>();
		list_words_sort = new ArrayList<Word>();
	}
	
	public void populateWordsList(String word) {
		
		Word Word_obj = new Word(word,1);
		Boolean bool_found = false;
		//System.out.println("Value of Word object = " + Word_obj.getWord()+","+Word_obj.getCount());
		
		if( (list_words = map_list_words.get(word.length())) == null ) {
			list_words = new ArrayList<Word>();
			list_words.add(Word_obj);
			map_list_words.put(word.length(), list_words );
		}
		else{
			for(Word s : list_words)
            {
                if(s.getWord().equals(word))
                {
                	s.setCount(s.getCount()+1);
                	bool_found = true;
                	break;
                }
            }
			if(!bool_found)
				list_words.add(Word_obj);
		}
	}
	
	public void displayWordsList() {
		for(Iterator <ArrayList<Word>>it =  map_list_words.values().iterator(); it.hasNext();)
        {
            ArrayList <Word>aList = (ArrayList<Word>) it.next();
            for(Word w : aList)
            {
                System.out.println(w.getWord()+" = "+w.getCount());
                list_words_sort.add(w);
            }
        }	
		list_words.clear();
		list_words = null;
		map_list_words.clear();
		map_list_words = null;
		Collections.sort(list_words_sort,new Comparator<Word>(){
			public int compare(Word w1,Word w2){
				Integer c1 = new Integer(w1.getCount());
				Integer c2 = new Integer(w2.getCount());
				int c = c1.compareTo(c2);
				return c;	
			}
		});
	}
	
	public void writeWordsList(String str_file_name) throws Exception{
		Writer writer_file =new BufferedWriter(new OutputStreamWriter(new FileOutputStream(str_file_name),"UTF-8"));
		/*for(Iterator <ArrayList<Word>>it =  map_list_words.values().iterator(); it.hasNext();)
        {
            ArrayList <Word>aList = (ArrayList<Word>) it.next();
            for(Word s : aList)
            {
                writer_file.write(s.getWord() + " = " + s.getCount() + "\n");
            }
        }*/

		for(Word w : list_words_sort)
		{
			writer_file.write(w.getWord() + " = " + w.getCount() + "\n");
		}
		
		writer_file.close();
	}
}
